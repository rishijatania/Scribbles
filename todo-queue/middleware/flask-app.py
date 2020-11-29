from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
from rejson import Client, Path

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
CORS(app)
WEBAPP_URL =  "http://localhost:8080" if os.getenv('WEBAPP_URL') == None else os.getenv('WEBAPP_URL')
REDIS_HOST =  "localhost" if os.getenv('REDIS_HOST') == None else os.getenv('REDIS_HOST')

rj = Client(host=REDIS_HOST, port=6379, decode_responses=True)
todo = {'notes':[]}
rj.jsonset('todo', Path.rootPath(), todo)

@app.route("/api/testHealth")
def hello():
	return jsonify(
		statusCode="200",
		message="Python Services are up and running."
	)

@app.route("/api/todolist/<id>", methods=["DELETE"])
@app.route("/api/todolist", methods=['POST','PUT'])
def analyse_sentiment(id=None):
	if(request.method == "DELETE"):
		apiObj = {
			'method':request.method,
			'body':{},
			'id':id
		}
	else:
		apiObj = {
			'method':request.method,
			'body':request.get_json(),
			'id':id
		}	
	rj.jsonarrappend('todo', Path('.notes'), apiObj)
	return jsonify(
		statusCode="203",
		message="Request Accepted"
	)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)