from flask import Flask, requist, jsonify
from dotenv import load_dotenv
import jwt
import os

load_dotenv()
secret_key = os.getenv('secret_key')

app = Flask(__name__)

@app.rout('/obesity', methods=['GET', 'POST'])
def obesity():
    if requist.method == 'GET':
        pass
    if requist.method == 'POST':
        pass



if "__name__" == "main":
    app.run(de)