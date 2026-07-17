from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = "chat_room"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        
        self.accept()
    
    def receive(self, text_data = None, bytes_data = None):
        data = json.loads(text_data)

        if data["type"] == "chat.message":
            self.handle_chat_message(data)


    
    def handle_chat_message(self,data):
        print("In handle chat method")
        print(f"type: {data["type"]}")
        print(f"message: {data["message"]}")

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type" :"chat_message",
                "message": data["message"],
            }
        )

    def chat_message(self,event):
        self.send(
            text_data= json.dumps({
                "type" :"chat.message",
                "message" : event["message"],
            })
        )

        

    def disconnect(self, close_code):
        print(f"Connection closed")
        print(f"Close code:{close_code}")
        
        
       
        
        