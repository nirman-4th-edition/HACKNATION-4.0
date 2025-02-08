import asyncio
import websockets
import json
import boto3
import decimal

dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
table = dynamodb.Table("angiosense_db")

last_processed_payload = None


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super().default(o)


async def fetch_data_from_dynamodb():
    global last_processed_payload
    try:
        print("Fetching data from DynamoDB...")
        response = table.scan()
        items = response.get("Items", [])

        print(f"Response from DynamoDB: {json.dumps(response, cls=DecimalEncoder, indent=4)}")

        data = {
            "SensorData": {
                "temperature": 0.0,
                "ecg": 0,
                "pulse": 0
            }
        }

        if items:

            print(f"Items fetched from DynamoDB: {items}")
            latest_item = max(items, key=lambda x: int(x.get("timestamp", 0)))
            payload = latest_item.get("payload", {})

            if payload != last_processed_payload:
                print("New payload detected. Updating data...")  # Debug statement
                last_processed_payload = payload

                data["SensorData"]["temperature"] = float(payload.get("temperature", 0))
                data["SensorData"]["ecg"] = payload.get("ecg", 0)
                data["SensorData"]["pulse"] = payload.get("pulse", 0)
            else:
                print("No new payload detected. Using previous data.")
        else:
            print("No items found in DynamoDB.")

        return data
    except Exception as e:
        print(f"Error fetching data from DynamoDB: {e}")
        return {}

async def handle_client(websocket):
    print("New client connected")
    while True:
        try:
            message = await websocket.recv()
            received_data = json.loads(message)
            print("Received from client:", json.dumps(received_data, indent=4))

        except websockets.exceptions.ConnectionClosed:
            print("Connection with client closed.")
            break

        except Exception as e:
            print(f"Error receiving data from client: {e}")
            break

async def send_data_from_dynamodb(websocket, path):
    receive_task = asyncio.create_task(handle_client(websocket))

    try:
        while True:
            data = await fetch_data_from_dynamodb()
            print("Fetched data from DynamoDB:", json.dumps(data, indent=4))

            if data:
                print("Sending data to client...")
                await websocket.send(json.dumps(data))
            else:
                print("No data to send.")

            await asyncio.sleep(1)

    except Exception as e:
        print(f"Error sending data to client: {e}")

    finally:
        receive_task.cancel()
        try:
            await receive_task
        except asyncio.CancelledError:
            pass
        print("Receive task cancelled.")

start_server = websockets.serve(send_data_from_dynamodb, "127.0.0.1", 5000)

print("WebSocket server starting on ws://127.0.0.1:5000")
asyncio.get_event_loop().run_until_complete(start_server)
print("WebSocket server is running.")
asyncio.get_event_loop().run_forever()