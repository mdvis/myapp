package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"
	"time"
)

type Proxy struct {
	targetURL *url.URL
	client    *http.Client
	responseDir string
}

func NewProxy(targetURLStr string) (*Proxy, error) {
	parsedURL, err := url.Parse(targetURLStr)
	if err != nil {
		return nil, fmt.Errorf("invalid target URL: %v", err)
	}

	return &Proxy{
		targetURL: parsedURL,
		client: &http.Client{
			Timeout: 30 * time.Second,
			Transport: &http.Transport{
				Proxy: http.ProxyFromEnvironment,
				DialContext: (&net.Dialer{
					Timeout:   30 * time.Second,
					KeepAlive: 30 * time.Second,
				}).DialContext,
				MaxIdleConns:        100,
				IdleConnTimeout:     90 * time.Second,
				TLSHandshakeTimeout: 10 * time.Second,
			},
		},
	}, nil
}

func (p *Proxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Log incoming request details
	log.Printf("Received request: Method=%s, Host=%s, Path=%s, RemoteAddr=%s",
		r.Method, r.Host, r.URL.Path, r.RemoteAddr)

	// Construct full target URL by combining base URL with current request path and query
	fullTargetURL := *p.targetURL
	fullTargetURL.Path = r.URL.Path
	fullTargetURL.RawQuery = r.URL.RawQuery

	// Log target URL
	log.Printf("Proxying to: %s", fullTargetURL.String())

	// Prepare the request to the target URL
	proxyReq, err := http.NewRequest(r.Method, fullTargetURL.String(), r.Body)
	if err != nil {
		log.Printf("Error creating proxy request: %v", err)
		http.Error(w, "Failed to create proxy request", http.StatusInternalServerError)
		return
	}

	// Copy headers from original request
	proxyReq.Header = r.Header.Clone()

	// Send the request
	resp, err := p.client.Do(proxyReq)
	if err != nil {
		log.Printf("Error sending proxy request: %v", err)
		http.Error(w, "Failed to send proxy request", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Generate filename based on the current URL path
	filename := p.generateFilename(r.URL)

	// Create the response file
	file, err := os.Create(filepath.Join(p.responseDir, filename))
	if err != nil {
		log.Printf("Error creating response file: %v", err)
		http.Error(w, "Failed to create response file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Copy response headers
	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}
	w.WriteHeader(resp.StatusCode)

	// Copy response body to file and response writer
	multiWriter := io.MultiWriter(w, file)
	if _, err := io.Copy(multiWriter, resp.Body); err != nil {
		log.Printf("Error writing response: %v", err)
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}

	log.Printf("Proxied request to %s, response saved to %s", fullTargetURL.String(), filename)
}

// generateFilename creates a filename based on the URL path
func (p *Proxy) generateFilename(u *url.URL) string {
	// Remove leading slash and replace remaining slashes with underscores
	safePath := strings.Trim(u.Path, "/")
	safePath = strings.ReplaceAll(safePath, "/", "_")

	// If path is empty, use "root"
	if safePath == "" {
		safePath = "root"
	}

	// Add query parameters if present
	if u.RawQuery != "" {
		safePath += "_" + url.QueryEscape(u.RawQuery)
	}

	// Add timestamp to ensure uniqueness
	filename := fmt.Sprintf("%s_%d.txt", safePath, time.Now().UnixNano())

	return filename
}

func main() {
	// Check if target URL is provided as a command-line argument
	if len(os.Args) < 2 {
		log.Fatal("Please provide a target URL as a command-line argument")
	}

	// Get the target URL from command-line argument
	targetURLStr := os.Args[1]

	// Create a new proxy instance
	proxy, err := NewProxy(targetURLStr)
	if err != nil {
		log.Fatalf("Failed to create proxy: %v", err)
	}

	// Create a directory to store response files if it doesn't exist
	responseDir := filepath.Join(".", "proxy_responses")
	if err := os.MkdirAll(responseDir, 0755); err != nil {
		log.Fatalf("Failed to create response directory: %v", err)
	}

	// Set the response directory in the proxy
	proxy.responseDir = responseDir

	// Start the HTTP server
	port := 8080
	log.Printf("Starting proxy server on :%d, forwarding to %s", port, targetURLStr)
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: proxy,
	}

	// Graceful shutdown handling
	go func() {
		sigChan := make(chan os.Signal, 1)
		signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
		<-sigChan
		log.Println("Shutting down server...")
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := server.Shutdown(ctx); err != nil {
			log.Printf("Server shutdown error: %v", err)
		}
	}()

	// Start the server
	if err := server.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatalf("Server error: %v", err)
	}
}
