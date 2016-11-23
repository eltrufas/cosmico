import requests
import random
import time
from threading import Timer

auth_req = requests.post('http://localhost:5000/api/get_token', json={
	"email": "admin",
	"password": "hunter1"
})

print auth_req.text

token = auth_req.json()['token']

headers = {'Authorization': token}

def submit_data():
    sensor = random.randint(1, 4)
    print sensor
    r = requests.post('http://localhost:5000/api/submit_data', headers=headers, json=[{
        'sensor_id': sensor,
        'data': True,
        'date': time.time()
    }])
    print r.text
    t = Timer(0.5, submit_data)
    t.start()

t = Timer(0.2, submit_data)
t.start() # after 30 seconds, "hello, world" will be printed
