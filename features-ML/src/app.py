from flask import Flask, request, jsonify
from flask_cors import CORS
from logger import logging  
from components.utils import MyLabelEncoder, convert_to_label_string
from components.obes_prediction import predict
import jwt
from dotenv import load_dotenv
import os

# Load variables from the .env file
load_dotenv()
SECRET_KEY = os.getenv('secret_key')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
CORS(app, origins=['http://localhost:3000'])


@app.route('/obesity', methods=['POST'])
def obesity():
    if request.method == 'POST':
        try:
            # get the data from request
            req_data = request.get_json()
            data = req_data.get('data')

            # pridict the output by passing the input data to predict methos
            prd_data = predict(data)
            print(f'prd_dat: {prd_data}')
            prd_label = convert_to_label_string(prd_data)
            prd_data_dict = {'prd_data': prd_label}

            # encode the data 
            encoded_data = jwt.encode(prd_data_dict, SECRET_KEY, algorithm='HS256') 
            return jsonify(encoded_data), 200

        except KeyError:
            return jsonify({'error': 'Data key not found in request'}), 400
    else:
        return jsonify({'error': 'Method not allowed'}), 405

if __name__ == "__main__":
    app.run(debug=True)
 