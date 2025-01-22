package main

import (
    "net/http"
    "net/http/httptest"
    "net/url"
    "testing"
)

func TestNewProxy(t *testing.T) {
    testCases := []struct {
        name        string
        targetURL   string
        expectError bool
    }{
        {
            name:        "Valid URL",
            targetURL:   "http://example.com",
            expectError: false,
        },
        {
            name:        "Invalid URL",
            targetURL:   "invalid-url",
            expectError: true,
        },
    }

    for _, tc := range testCases {
        t.Run(tc.name, func(t *testing.T) {
            proxy, err := NewProxy(tc.targetURL)

            if tc.expectError {
                if err == nil {
                    t.Errorf("Expected an error, but got none")
                }
            } else {
                if err != nil {
                    t.Errorf("Unexpected error: %v", err)
                }
                if proxy == nil {
                    t.Errorf("Proxy should not be nil")
                }
                if proxy.targetURL.String() != tc.targetURL {
                    t.Errorf("Target URL mismatch: got %s, want %s", proxy.targetURL.String(), tc.targetURL)
                }
            }
        })
    }
}

func TestGenerateFilename(t *testing.T) {
    proxy := &Proxy{}
    testCases := []struct {
        name     string
        inputURL string
        expected string
    }{
        {
            name:     "Simple path",
            inputURL: "http://example.com/path/to/resource",
            expected: "example.com_path_to_resource.txt",
        },
        {
            name:     "Root path",
            inputURL: "http://example.com/",
            expected: "example.com_root.txt",
        },
        {
            name:     "Complex path with query",
            inputURL: "http://example.com/path?param1=value1&param2=value2",
            expected: "example.com_path.txt",
        },
    }

    for _, tc := range testCases {
        t.Run(tc.name, func(t *testing.T) {
            parsedURL, _ := url.Parse(tc.inputURL)
            filename := proxy.generateFilename(parsedURL)

            if filename != tc.expected {
                t.Errorf("Filename mismatch: got %s, want %s", filename, tc.expected)
            }
        })
    }
}

func TestServeHTTP(t *testing.T) {
    // Mock target server
    targetServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Hello, World!"))
    }))
    defer targetServer.Close()

    // Create proxy
    proxy, err := NewProxy(targetServer.URL)
    if err != nil {
        t.Fatalf("Failed to create proxy: %v", err)
    }

    // Create test server with proxy
    proxyServer := httptest.NewServer(proxy)
    defer proxyServer.Close()

    // Make request through proxy
    resp, err := http.Get(proxyServer.URL)
    if err != nil {
        t.Fatalf("Failed to make request: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        t.Errorf("Unexpected status code: got %d, want %d", resp.StatusCode, http.StatusOK)
    }
}
