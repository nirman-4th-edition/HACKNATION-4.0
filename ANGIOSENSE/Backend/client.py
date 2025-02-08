import websocket
import json

def on_message(ws, message):
    print(f"Received from server: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print(f"Connection closed. Status code: {close_status_code}, Message: {close_msg}")

def on_open(ws):
    print("Connection opened")
    test_data = {
        "SensorData": {
            "temperature": 26.5,
            "ecg": 2000,
            "pulse": 160
        }
    }
    ws.send(json.dumps(test_data))
    print("Sent test data.")

ws = websocket.WebSocketApp(
    "ws://127.0.0.1:5000",
    on_message=on_message,
    on_error=on_error,
    on_close=on_close,
    on_open=on_open,
)

ws.run_forever()
