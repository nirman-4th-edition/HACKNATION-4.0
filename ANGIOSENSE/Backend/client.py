import websocket
import json
import time

def on_message(ws, message):
    print(f"Received from server: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws):
    print("Connection closed")


ws = websocket.WebSocketApp(
    "ws://127.0.0.1:5000",
    on_message=on_message,
    on_error=on_error,
    on_close=on_close,
    on_open=on_open,
)

ws.run_forever()