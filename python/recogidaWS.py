import asyncio
import pathlib
import ssl
import websockets
import socketio
import json
import time


sio = socketio.Client()
sio.connect('http://localhost:4000')


async def hello():
    uri = "wss://eu3.loriot.io/app?token=vgEBoQAAAA1ldTMubG9yaW90LmlvprAr0_PUyj4DWh-LeiAqGQ=="
    async with websockets.connect(
        uri, ssl=True
    ) as websocket:
        while True:
            greeting = await websocket.recv()
            print(f"< {greeting}")
            datos = json.loads(greeting)
            sio.emit('data', datos)


asyncio.get_event_loop().run_until_complete(hello())
asyncio.get_event_loop().run_forever()


@sio.event
def message(data):
    print('I received a message!')


@sio.event
def inicio(data):
    print(f'Enviando datos: ')
    initTrx()


@sio.event
def fin(data):
    print('Fin. No se envian mas datos')


@sio.event
def connect():
    print("I'm connected!")
    print('Esperando orden para mandar datos')


def initTrx():
    while True:
        sio.emit('data', {'tempI': '35', 'tempE': '34',
                          'caida': '1', 'puls': '97'})
        sio.emit('data', {'tempI': '32', 'tempE': '36',
                          'caida': '1', 'puls': '94'})
