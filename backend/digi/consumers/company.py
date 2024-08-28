import hashlib
import json
import traceback
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
import jwt
   
class CompanyConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user = self.scope['user']

        if self.user.is_anonymous:
            await self.close()

        self.room_group_name = f'group_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.channel_layer.group_send(
            self.room_group_name, { 
                  'type': 'user_joined',
                  'user': self.user,

            }
        )

        await self.accept()

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        await self.channel_layer.group_send(
            self.room_group_name, { 
                  'type': 'user_disconnect',
                  'user': self.user,
            }
        )


    async def receive(self, text_data):
        try:
            if not text_data:
                return
        
            text_data_json = json.loads(text_data)
            message = text_data_json.get('message')
            message_type = text_data_json.get('type')

            if not message_type or not self.user:
                return
            

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': message_type,
                    'message': message,
                    'user': {
                        'id': self.user.id,
                        'username': self.user.username,
                        'email': self.user.email,
                        'roles': self.user.get_roles()
                    },
                    'payload': text_data_json.get('payload', {})

                }
            )
       
        except Exception as e:
            tb_traceback = traceback.format_tb(e.__traceback__)
            print("ERROR: ", e, tb_traceback)
            pass
            
        


    async def ticket_added(self, event):
        await self.send(text_data=json.dumps(event))


    async def ticket_updated(self, event):
        await self.send(text_data=json.dumps(event))

    async def user_joined(self, event):

        current_user = event['user']

        await self.send(text_data=json.dumps({
            "type": "user_joined",
            "user": 
                 {
                    'id': current_user.id,
                    'username': current_user.username,
                    'roles': current_user.get_roles()

                },
            "message": f"{current_user.username} se ha unido al chat",
        }))

    async def user_disabled(self, event):
        user_inhibited = (event.get('payload') or {}).get('user')
        
        await self.send(text_data=json.dumps({
            "type": "user_disabled",
            "user":  user_inhibited,
            "message": f"Ha sido deshabilitado por un administrador",
        }))

    async def user_updated(self, event):
        user_updated = (event.get('payload') or {}).get('user')
        
        await self.send(text_data=json.dumps({
            "type": "user_updated",
            "user":  user_updated,
            "message": f"Ha sido actualizado por un administrador",
        }))

   
        
       


    async def user_disconnect(self, event):
        current_user = event['user']

        await self.send(text_data=json.dumps({
            "type": "user_disconnect",
            "user": 
                 {
                    'id': current_user.id,
                    'username': current_user.username,
                    'roles': current_user.get_roles()

                },
            "message": f"{current_user.username} se ha desconectado al chat",
        }))
