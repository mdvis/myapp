// ------
// name: user_test.go
// author: Deve
// ------
// name: user.go
// author: Deve
// date: 2025-01-10
// ------

package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
)

func TestLogin(t *testing.T) {
	// Test GET request
	req, err := http.NewRequest("GET", "/login", nil)
	if err != nil {
		t.Fatal(err)
	}

	w := httptest.NewRecorder()
	login(w, req)

	// Check response status code
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Check response body contains token
	body := w.Body.String()
	if !strings.Contains(body, "token") {
		t.Errorf("Expected response to contain token, got %s", body)
	}

	// Test POST request
	formData := url.Values{
		"username": {"testuser"},
		"password": {"testpass"},
		"token":    {"sometoken"},
	}

	req, err = http.NewRequest("POST", "/login", bytes.NewBufferString(formData.Encode()))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	w = httptest.NewRecorder()
	login(w, req)

	// Check redirect status code
	if w.Code != http.StatusTemporaryRedirect {
		t.Errorf("Expected status code %d, got %d", http.StatusTemporaryRedirect, w.Code)
	}

	// Check redirect location
	location := w.Header().Get("Location")
	expectedLocation := "/sse?name=testuser&pass=testpass"
	if location != expectedLocation {
		t.Errorf("Expected redirect to %s, got %s", expectedLocation, location)
	}
}

func TestRegister(t *testing.T) {
	// Test GET request
	req, err := http.NewRequest("GET", "/register", nil)
	if err != nil {
		t.Fatal(err)
	}

	w := httptest.NewRecorder()
	register(w, req)

	// Check response status code
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Check response body contains registration form
	body := w.Body.String()
	if !strings.Contains(body, "<form") || !strings.Contains(body, "username") || !strings.Contains(body, "password") {
		t.Errorf("Expected registration form in response, got %s", body)
	}

	// Test POST request
	formData := url.Values{
		"username": {"newuser"},
		"password": {"newpass"},
	}

	req, err = http.NewRequest("POST", "/register", bytes.NewBufferString(formData.Encode()))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	w = httptest.NewRecorder()
	register(w, req)

	// Check response body contains submitted username and password
	body = w.Body.String()
	if !strings.Contains(body, "newuser") || !strings.Contains(body, "newpass") || !strings.Contains(body, "register") {
		t.Errorf("Expected username and password in response, got %s", body)
	}
}

// date: 2025-01-13
// ------
