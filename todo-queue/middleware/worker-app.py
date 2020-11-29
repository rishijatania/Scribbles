from rejson import Client, Path
import json
import time
from datetime import date, datetime, timedelta
from timeloop import Timeloop
import os
import requests

# start timeloop
tl = Timeloop()

WEBAPP_URL =  "http://localhost:8080" if os.getenv('WEBAPP_URL') == None else os.getenv('WEBAPP_URL')
REDIS_HOST =  "localhost" if os.getenv('REDIS_HOST') == None else os.getenv('REDIS_HOST')

# connect to queue
rj = Client(host=REDIS_HOST, port=6379, decode_responses=True)
todo = {'notes':[]}
rj.jsonset('todo', Path.rootPath(), todo)

def verify_comms_local(body,method,id):
	try:
		print(WEBAPP_URL)
		print(body)
		print(method)
		if(method == 'POST'):
			response = requests.post(WEBAPP_URL+"/api/todolist",data=json.dumps(body),headers={"content-type":"application/json"})
		elif(method == 'PUT'):
			response = requests.put(WEBAPP_URL+"/api/todolist",data=json.dumps(body),headers={"content-type":"application/json"})
		elif(method =='DELETE'):
			response = requests.delete(WEBAPP_URL+"/api/todolist/"+id)

	except requests.exceptions.RequestException as err:
		print(err)
		print("Exception")

	errresponse =  {
		"statusCode":"500",
		"message":"Backend Services are down."
    }
	result= errresponse if (requests.exceptions.RequestException) and not (response and response.ok) else response.text
	print(result)

# every 100 seconds, print groups
@tl.job(interval=timedelta(seconds=30))
def lookanddsee():
	# get contents
    for obj in rj.jsonget('todo', Path('.notes')):
        print(obj)
        rj.jsonarrpop('todo', Path('.notes'))
        verify_comms_local(obj['body'],obj['method'],obj['id'])

if __name__ == "__main__":
    tl.start(block=True)