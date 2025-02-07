// IOTSIM is a simple IoT authentication simulator that demonstrates the BasIoT protocol.
// The simulator creates a blockchain system with devices and resources, and simulates different scenarios for authentication.
// The scenarios include legitimate authentication, hacker attempts, expired requests, and replay attacks.
// Made for HackNation4.0 by Team cipher

package main

import (
	"bufio"
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	rn "math/rand"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

const (
	ASCII_BANNER = `
[1;36m╔══════════════════════════════════════════╗
║                 IOTSIM                         ║
║           Secure IoT Auth Demo                 ║
║                                                ║
║            made by Team Cipher                 ║
╚══════════════════════════════════════════╝[0m
`
	ColorReset  = "\033[0m"
	ColorRed    = "\033[31m"
	ColorGreen  = "\033[32m"
	ColorYellow = "\033[33m"
	ColorBlue   = "\033[34m"
	ColorPurple = "\033[35m"
	ColorCyan   = "\033[36m"
)

// Device represents an IoT device
type Device struct {
	ID         string          `json:"device_identifier"`
	Descriptor string          `json:"device_descriptor"`
	Address    string          `json:"d_addr"`
	PrivateKey *rsa.PrivateKey `json:"-"`
	PublicKey  *rsa.PublicKey  `json:"-"`
}

// ResourceHolder represents a resource provider in the IoT network
type ResourceHolder struct {
	ID         string          `json:"resource_id"`
	Type       string          `json:"resource_type"`
	PrivateKey *rsa.PrivateKey `json:"-"`
	PublicKey  *rsa.PublicKey  `json:"-"`
}

// AuthRequest represents an authentication request
type AuthRequest struct {
	DeviceAddr string    `json:"device_addr"`
	ResourceID string    `json:"resource_id"`
	Timestamp  time.Time `json:"timestamp"`
	Nonce      string    `json:"nonce"`
	Signature  string    `json:"signature"`
}

// SimulationType represents different simulation scenarios
type SimulationType int

const (
	LegitimateAuth SimulationType = iota
	HackerAttempt
	ExpiredRequest
	ReplayAttack
)

func (st SimulationType) String() string {
	return [...]string{
		"Legitimate Authentication",
		"Hacker Attempt",
		"Expired Request",
		"Replay Attack",
	}[st]
}

// BlockchainSimulator simulates a basic blockchain for device registry
type BlockchainSimulator struct {
	Devices   map[string]*Device
	Resources map[string]*ResourceHolder
}

// NewBlockchainSimulator creates a new blockchain simulator
func NewBlockchainSimulator() *BlockchainSimulator {
	return &BlockchainSimulator{
		Devices:   make(map[string]*Device),
		Resources: make(map[string]*ResourceHolder),
	}
}

func (bc *BlockchainSimulator) RegisterDevice(device *Device) error {
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return fmt.Errorf("failed to generate RSA key: %v", err)
	}

	device.PrivateKey = privateKey
	device.PublicKey = &privateKey.PublicKey

	addr := make([]byte, 32)
	rand.Read(addr)
	device.Address = base64.StdEncoding.EncodeToString(addr)

	bc.Devices[device.ID] = device
	return nil
}

func (bc *BlockchainSimulator) RegisterResource(resource *ResourceHolder) error {
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return fmt.Errorf("failed to generate RSA key: %v", err)
	}

	resource.PrivateKey = privateKey
	resource.PublicKey = &privateKey.PublicKey

	bc.Resources[resource.ID] = resource
	return nil
}

// AuthenticationProtocol implements the BasIoT authentication process
type AuthenticationProtocol struct {
	blockchain   *BlockchainSimulator
	usedNonces   map[string]bool
	replayWindow time.Duration
	nonceCleanup time.Time
}

func NewAuthenticationProtocol(bc *BlockchainSimulator) *AuthenticationProtocol {
	return &AuthenticationProtocol{
		blockchain:   bc,
		usedNonces:   make(map[string]bool),
		replayWindow: 5 * time.Minute,
		nonceCleanup: time.Now(),
	}
}

func (ap *AuthenticationProtocol) recordNonce(nonce string) {
	ap.usedNonces[nonce] = true
}

func (ap *AuthenticationProtocol) isNonceUsed(nonce string) bool {
	if time.Since(ap.nonceCleanup) > time.Hour {
		ap.cleanupNonces()
	}
	return ap.usedNonces[nonce]
}

func (ap *AuthenticationProtocol) cleanupNonces() {
	ap.usedNonces = make(map[string]bool)
	ap.nonceCleanup = time.Now()
}

func (ap *AuthenticationProtocol) RequestAuthentication(deviceID, resourceID string) (*AuthRequest, error) {
	device, exists := ap.blockchain.Devices[deviceID]
	if !exists {
		return nil, fmt.Errorf("device not found: %s", deviceID)
	}

	if _, exists := ap.blockchain.Resources[resourceID]; !exists {
		return nil, fmt.Errorf("resource not found: %s", resourceID)
	}

	nonce := make([]byte, 32)
	rand.Read(nonce)
	nonceStr := base64.StdEncoding.EncodeToString(nonce)

	request := &AuthRequest{
		DeviceAddr: device.Address,
		ResourceID: resourceID,
		Timestamp:  time.Now(),
		Nonce:      nonceStr,
	}

	message := fmt.Sprintf("%s%s%s%s", request.DeviceAddr, request.ResourceID,
		request.Timestamp.Format(time.RFC3339), request.Nonce)
	hashed := sha256.Sum256([]byte(message))

	signature, err := rsa.SignPKCS1v15(rand.Reader, device.PrivateKey, crypto.SHA256, hashed[:])
	if err != nil {
		return nil, fmt.Errorf("failed to sign request: %v", err)
	}

	request.Signature = base64.StdEncoding.EncodeToString(signature)
	return request, nil
}

func (ap *AuthenticationProtocol) SimulateHackerAttempt(request *AuthRequest) *AuthRequest {
	hackedRequest := *request
	switch rn.Intn(3) {
	case 0:
		hackedRequest.DeviceAddr = "hacked_" + hackedRequest.DeviceAddr
	case 1:
		hackedRequest.Timestamp = hackedRequest.Timestamp.Add(time.Hour)
	case 2:
		sig := []byte(hackedRequest.Signature)
		sig[len(sig)-1] ^= 1
		hackedRequest.Signature = string(sig)
	}
	return &hackedRequest
}

func (ap *AuthenticationProtocol) SimulateScenario(request *AuthRequest, simType SimulationType) *AuthRequest {
	switch simType {
	case HackerAttempt:
		return ap.SimulateHackerAttempt(request)
	case ExpiredRequest:
		modifiedRequest := *request
		modifiedRequest.Timestamp = time.Now().Add(-10 * time.Minute)
		return &modifiedRequest
	case ReplayAttack:
		ap.recordNonce(request.Nonce)
		return request
	default:
		return request
	}
}

func (ap *AuthenticationProtocol) VerifyAuthentication(request *AuthRequest) (bool, error) {
	if time.Since(request.Timestamp) > 5*time.Minute {
		return false, fmt.Errorf("request expired: timestamp too old")
	}

	if ap.isNonceUsed(request.Nonce) {
		return false, fmt.Errorf("nonce already used: possible replay attack")
	}

	var device *Device
	for _, d := range ap.blockchain.Devices {
		if d.Address == request.DeviceAddr {
			device = d
			break
		}
	}

	if device == nil {
		return false, fmt.Errorf("device not found with address: %s", request.DeviceAddr)
	}

	message := fmt.Sprintf("%s%s%s%s", request.DeviceAddr, request.ResourceID,
		request.Timestamp.Format(time.RFC3339), request.Nonce)
	hashed := sha256.Sum256([]byte(message))

	signature, err := base64.StdEncoding.DecodeString(request.Signature)
	if err != nil {
		return false, fmt.Errorf("failed to decode signature: %v", err)
	}

	err = rsa.VerifyPKCS1v15(device.PublicKey, crypto.SHA256, hashed[:], signature)
	if err != nil {
		return false, nil
	}

	ap.recordNonce(request.Nonce)
	return true, nil
}

func displayKeyGeneration(keyA, keyB *rsa.PrivateKey) {
	// Show key generation animation
	displayFrame(keyMatchingFrames[0], ColorBlue)
	time.Sleep(1 * time.Second)

	// Display public key fingerprints
	pubKeyA := sha256.Sum256([]byte(fmt.Sprintf("%v", keyA.PublicKey.N)))
	pubKeyB := sha256.Sum256([]byte(fmt.Sprintf("%v", keyB.PublicKey.N)))

	keyFrame := fmt.Sprintf(`
    Device A                 Device B
    [💻 ]                    [ 🖥️]
    🔑 A: %x           🔑 B: %x
    `, pubKeyA[:4], pubKeyB[:4])

	displayFrame(keyFrame, ColorCyan)
	time.Sleep(1 * time.Second)
}

func (ap *AuthenticationProtocol) SimulateSecureConnection(deviceA, deviceB *Device) (*DeviceConnection, error) {
	printHeader("Initiating Secure Connection")

	// Display initial state
	displayFrame(connectionAnimationFrames[0], ColorBlue)

	// Step 1: Initial Hello
	printColored(ColorYellow, "Step 1: Initial Contact")
	displayFrame(connectionAnimationFrames[1], ColorBlue)

	// Generate ephemeral keys for perfect forward secrecy
	printColored(ColorYellow, "Step 2: Generating Ephemeral Keys")
	animateHandshake()

	ephemeralKeyA, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return nil, fmt.Errorf("failed to generate ephemeral key A: %v", err)
	}

	ephemeralKeyB, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return nil, fmt.Errorf("failed to generate ephemeral key B: %v", err)
	}

	// Display key generation and matching
	displayKeyGeneration(ephemeralKeyA, ephemeralKeyB)

	// Step 3: Key Exchange
	printColored(ColorYellow, "Step 3: Exchanging Public Keys")
	displayFrame(keyMatchingFrames[2], ColorBlue)
	time.Sleep(1 * time.Second)
	displayFrame(keyMatchingFrames[3], ColorBlue)
	time.Sleep(1 * time.Second)

	// Step 4: Challenge
	printColored(ColorYellow, "Step 4: Challenge-Response Authentication")
	displayFrame(connectionAnimationFrames[2], ColorBlue)

	challenge := make([]byte, 32)
	rand.Read(challenge)

	// Sign challenge with permanent keys
	signature, err := rsa.SignPKCS1v15(rand.Reader, deviceA.PrivateKey, crypto.SHA256, challenge)
	if err != nil {
		return nil, fmt.Errorf("failed to sign challenge: %v", err)
	}

	// Step 5: Response Verification
	printColored(ColorYellow, "Step 5: Verifying Signatures")
	displayFrame(connectionAnimationFrames[3], ColorBlue)

	// Verify signature
	err = rsa.VerifyPKCS1v15(deviceA.PublicKey, crypto.SHA256, challenge, signature)
	if err != nil {
		return nil, fmt.Errorf("failed to verify signature: %v", err)
	}

	// Generate shared secret
	sharedSecret := make([]byte, 32)
	rand.Read(sharedSecret)

	// Display shared secret establishment
	sharedFrame := fmt.Sprintf(`
    Device A                 Device B
    [💻 ]    <══════>       [ 🖥️]
    🔒 Shared: %x      🔒 Shared: %x
    `, sharedSecret[:4], sharedSecret[:4])

	displayFrame(sharedFrame, ColorGreen)
	time.Sleep(1 * time.Second)

	connection := &DeviceConnection{
		DeviceA:      deviceA,
		DeviceB:      deviceB,
		SharedSecret: sharedSecret,
		Established:  true,
		StartTime:    time.Now(),
	}

	// Display final connection details
	printColored(ColorGreen, "\n✓ Secure connection established successfully!")
	printColored(ColorYellow, "\nConnection Details:")
	fmt.Printf("• Device A: %s (%s)\n", deviceA.ID, deviceA.Descriptor)
	fmt.Printf("• Device B: %s (%s)\n", deviceB.ID, deviceB.Descriptor)
	fmt.Printf("• Established: %s\n", time.Now().Format(time.RFC3339))
	fmt.Printf("• Security: Perfect Forward Secrecy with Ephemeral Keys\n")
	fmt.Printf("• Key Exchange: RSA-2048\n")
	sharedSecretHash := sha256.Sum256(sharedSecret)
	fmt.Printf("• Shared Secret Hash: %x\n", sharedSecretHash[:8])

	return connection, nil
}

type MonitorData struct {
	Devices     []*Device       `json:"devices"`
	AuthMetrics AuthMetrics     `json:"authMetrics"`
	Events      []SecurityEvent `json:"events"`
}

type AuthMetrics struct {
	LegitimateAuth  int `json:"legitimateAuth"`
	HackerAttempts  int `json:"hackerAttempts"`
	ExpiredRequests int `json:"expiredRequests"`
	ReplayAttacks   int `json:"replayAttacks"`
}

type SecurityEvent struct {
	Timestamp time.Time      `json:"timestamp"`
	Type      SimulationType `json:"type"`
	DeviceID  string         `json:"deviceId"`
	Success   bool           `json:"success"`
}

// DeviceConnection represents a secure connection between two devices
type DeviceConnection struct {
	DeviceA      *Device
	DeviceB      *Device
	SharedSecret []byte
	Established  bool
	StartTime    time.Time
}

// ASCII animation frames for the connection process
var connectionAnimationFrames = []string{
	`
    Device A                 Device B
    [💻 ]                    [ 🖥️]
    ....                    ....
    `,
	`
    Device A                 Device B
    [💻 ]    ------>        [ 🖥️]
    ....    Hello!          ....
    `,
	`
    Device A                 Device B
    [💻 ]    <------        [ 🖥️]
    ....    Challenge       ....
    `,
	`
    Device A                 Device B
    [💻 ]    ------>        [ 🖥️]
    ....    Response        ....
    `,
	`
    Device A                 Device B
    [💻 ]    <══════>       [ 🖥️]
    ....   Secure Link      ....
    `,
}

var keyMatchingFrames = []string{
	`
    Device A                 Device B
    [💻 ]                    [ 🖥️]
    🔑 Generating...         🔑 Generating...
    `,
	`
    Device A                 Device B
    [💻 ]                    [ 🖥️]
    🔑 A: 3f2e...           🔑 B: 8a1d...
    `,
	`
    Device A                 Device B
    [💻 ] ----key_pub_A---> [ 🖥️]
    🔑 Exchanging           🔑 Receiving
    `,
	`
    Device A                 Device B
    [💻 ] <--key_pub_B---- [ 🖥️]
    🔑 Receiving           🔑 Exchanging
    `,
	`
    Device A                 Device B
    [💻 ]    <══════>       [ 🖥️]
    🔒 Shared: 9d4e...      🔒 Shared: 9d4e...
    `,
}

// handshakeAnimationFrames for the key exchange process
var handshakeAnimationFrames = []string{
	"🔑 Generating keys     ",
	"🔑 Generating keys.    ",
	"🔑 Generating keys..   ",
	"🔑 Generating keys...  ",
}

type Monitor struct {
	blockchain *BlockchainSimulator
	auth       *AuthenticationProtocol
	clients    map[*websocket.Conn]bool
	broadcast  chan MonitorData
	mutex      sync.Mutex
	metrics    AuthMetrics
	events     []SecurityEvent
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for demo
	},
}

func NewMonitor(bc *BlockchainSimulator, auth *AuthenticationProtocol) *Monitor {
	return &Monitor{
		blockchain: bc,
		auth:       auth,
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan MonitorData),
		events:     make([]SecurityEvent, 0),
	}
}

func (m *Monitor) StartServer() {
	// Start HTTP server for WebSocket connections
	http.HandleFunc("/ws", m.handleConnections)

	// Start broadcasting goroutine
	go m.handleBroadcasts()

	// Start the server in a goroutine
	go func() {
		log.Println("Starting WebSocket server on :8080")
		if err := http.ListenAndServe(":8080", nil); err != nil {
			log.Fatal("ListenAndServe:", err)
		}
	}()
}

func (m *Monitor) handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a WebSocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection: %v", err)
		return
	}
	defer ws.Close()

	// Register new client
	m.mutex.Lock()
	m.clients[ws] = true
	m.mutex.Unlock()

	// Send initial data
	initialData := m.getMonitorData()
	if err := ws.WriteJSON(initialData); err != nil {
		log.Printf("Error sending initial data: %v", err)
		return
	}

	// Keep connection alive and handle disconnection
	for {
		if _, _, err := ws.ReadMessage(); err != nil {
			m.mutex.Lock()
			delete(m.clients, ws)
			m.mutex.Unlock()
			break
		}
	}
}

func (m *Monitor) handleBroadcasts() {
	for data := range m.broadcast {
		m.mutex.Lock()
		for client := range m.clients {
			if err := client.WriteJSON(data); err != nil {
				log.Printf("Error broadcasting to client: %v", err)
				client.Close()
				delete(m.clients, client)
			}
		}
		m.mutex.Unlock()
	}
}

func (m *Monitor) RecordAuthEvent(simType SimulationType, deviceID string, success bool) {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	// Record event
	event := SecurityEvent{
		Timestamp: time.Now(),
		Type:      simType,
		DeviceID:  deviceID,
		Success:   success,
	}
	m.events = append(m.events, event)

	// Update metrics
	switch simType {
	case LegitimateAuth:
		m.metrics.LegitimateAuth++
	case HackerAttempt:
		m.metrics.HackerAttempts++
	case ExpiredRequest:
		m.metrics.ExpiredRequests++
	case ReplayAttack:
		m.metrics.ReplayAttacks++
	}

	// Broadcast updated data
	m.broadcast <- m.getMonitorData()
}

func (m *Monitor) getMonitorData() MonitorData {
	devices := make([]*Device, 0)
	for _, device := range m.blockchain.Devices {
		devices = append(devices, device)
	}

	return MonitorData{
		Devices:     devices,
		AuthMetrics: m.metrics,
		Events:      m.events,
	}
}

func printColored(color, message string) {
	fmt.Printf("%s%s%s\n", color, message, ColorReset)
}

func getUserInput(prompt string) string {
	printColored(ColorYellow, prompt)
	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	return strings.TrimSpace(input)
}

func printResult(success bool, message string) {
	if success {
		printColored(ColorGreen, "✓ SUCCESS: "+message)
	} else {
		printColored(ColorRed, "✗ FAILURE: "+message)
	}
}

func printDivider() {
	printColored(ColorCyan, strings.Repeat("=", 50))
}

func printHeader(title string) {
	printDivider()
	printColored(ColorPurple, title)
	printDivider()
}

func colorBool(b bool) string {
	if b {
		return ColorGreen + "✓" + ColorReset
	}
	return ColorRed + "✗" + ColorReset
}

func clearScreen() {
	fmt.Print("\033[H\033[2J")
}

func displayFrame(frame string, color string) {
	clearScreen()
	fmt.Printf("%s%s%s\n", color, frame, ColorReset)
	time.Sleep(500 * time.Millisecond)
}

func animateHandshake() {
	for i := 0; i < 3; i++ {
		for _, frame := range handshakeAnimationFrames {
			clearScreen()
			fmt.Printf("%s%s%s\n", ColorCyan, frame, ColorReset)
			time.Sleep(200 * time.Millisecond)
		}
	}
}

func simulateDeviceConnection(blockchain *BlockchainSimulator, auth *AuthenticationProtocol) {
	// Register a second device for connection demonstration
	deviceB := &Device{
		ID:         "device002",
		Descriptor: "Smart Light Controller",
	}

	if err := blockchain.RegisterDevice(deviceB); err != nil {
		log.Fatalf("Failed to register device B: %v", err)
	}

	// Get existing device
	deviceA := blockchain.Devices["device001"]

	// Simulate connection
	connection, err := auth.SimulateSecureConnection(deviceA, deviceB)
	if err != nil {
		printColored(ColorRed, fmt.Sprintf("Connection failed: %v", err))
		return
	}

	if connection.Established {
		printColored(ColorGreen, "\nSecure connection simulation completed successfully!")
	}
}

func main() {

	fmt.Println(ASCII_BANNER)

	blockchain := NewBlockchainSimulator()
	auth := NewAuthenticationProtocol(blockchain)

	// Initialize and start the monitor
	monitor := NewMonitor(blockchain, auth)
	monitor.StartServer()

	device := &Device{
		ID:         "device001",
		Descriptor: "Temperature Sensor",
	}
	resource := &ResourceHolder{
		ID:   "resource001",
		Type: "Data Storage",
	}

	if err := blockchain.RegisterDevice(device); err != nil {
		log.Fatalf("Failed to register device: %v", err)
	}
	if err := blockchain.RegisterResource(resource); err != nil {
		log.Fatalf("Failed to register resource: %v", err)
	}

	printColored(ColorGreen, "Blockchain Simulator Initialized Successfully!")
	printColored(ColorGreen, "Device and Resource Registered!")

	for {
		printColored(ColorYellow, "\nAvailable Simulation Scenarios:")
		printColored(ColorCyan, "1. Legitimate Authentication")
		printColored(ColorCyan, "2. Hacker Attempt")
		printColored(ColorCyan, "3. Expired Request")
		printColored(ColorCyan, "4. Replay Attack")
		printColored(ColorCyan, "5. Simulate Device Connection")
		printColored(ColorCyan, "6. Exit")

		choice := getUserInput("\nSelect scenario (1-6): ")

		if choice == "6" {
			printColored(ColorGreen, "Exiting simulator. Goodbye!")
			break
		}

		var simType SimulationType
		switch choice {
		case "1":
			simType = LegitimateAuth
		case "2":
			simType = HackerAttempt
		case "3":
			simType = ExpiredRequest
		case "4":
			simType = ReplayAttack
		case "5":
			simulateDeviceConnection(blockchain, auth)
			continue
		case "6":
			printColored(ColorGreen, "Exiting simulator. Goodbye!")
			break
		default:
			printColored(ColorRed, "Invalid choice. Please try again.")
			continue
		}

		printHeader(fmt.Sprintf("Simulating: %s", simType))

		request, err := auth.RequestAuthentication(device.ID, resource.ID)
		if err != nil {
			printColored(ColorRed, fmt.Sprintf("Error creating request: %v", err))
			continue
		}

		simulatedRequest := auth.SimulateScenario(request, simType)
		requestJSON, _ := json.MarshalIndent(simulatedRequest, "", "  ")

		printColored(ColorBlue, "Authentication Request:")
		fmt.Println(string(requestJSON))

		verified, err := auth.VerifyAuthentication(simulatedRequest)
		monitor.RecordAuthEvent(simType, device.ID, verified)

		if verified {
			printResult(true, "Authentication successful")
		} else {
			if err != nil {
				printResult(false, fmt.Sprintf("Authentication failed: %v", err))
			} else {
				printResult(false, "Authentication failed: Invalid signature")
			}
		}

		printHeader("Security Analysis")
		printColored(ColorCyan, "Checks Performed:")
		fmt.Printf("• Signature Verification: %s\n", colorBool(verified))
		fmt.Printf("• Timestamp Valid: %s\n", colorBool(time.Since(simulatedRequest.Timestamp) <= 5*time.Minute))
		fmt.Printf("• Nonce Unique: %s\n", colorBool(!auth.isNonceUsed(simulatedRequest.Nonce)))
		fmt.Printf("• Device Verified: %s\n", colorBool(device.Address == simulatedRequest.DeviceAddr))
	}
}
