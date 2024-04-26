from flask import Flask, request, jsonify
from flask_cors import CORS
from logger import logging  
from components.utils import MyLabelEncoder, convert_to_label_string
from components.obes_prediction import predict
import jwt
from dotenv import load_dotenv
import os
from components.pneumonia_predict import pneumonia_prd
from components.diabetis_prediction import diabetis_prd
from exception import CustomException
import pandas as pd
import sys

# Load variables from the .env file
load_dotenv()
SECRET_KEY = os.getenv('secret_key')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
CORS(app, origins=['http://localhost:3000'])


@app.route('/Obesity_level', methods=['POST'])
def obesity():
    try:
        # get the data from request
        req_data = request.get_json()
        data = req_data.get('data')
        print(f"Obese data recived from client...........")

        # pridict the output by passing the input data to predict methos
        prd_data = predict(data)

        # map the prd_data to the coresponding class
        prd_label = convert_to_label_string(prd_data)
        prd_data_dict = {'prd_data': prd_label}

        # encode the data 
        encoded_data = jwt.encode(prd_data_dict, str(SECRET_KEY), algorithm='HS256') 

        return jsonify(encoded_data), 200   
     
    except Exception as e:
        raise CustomException(e, sys)


@app.route('/pneumonia', methods=['POST'])
def pneumonia():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['image']
        print(f"Pneumonia image readed successfully..........")

        # predict the class usint file 
        prd_class = pneumonia_prd(file)
        prd_class_dict = {'prd_class': prd_class}

        # encode the data 
        encoded_data = jwt.encode(prd_class_dict, str(SECRET_KEY), algorithm='HS256') 
        
        return jsonify(encoded_data), 200
    
    except Exception as e:
        raise CustomException(e, sys)

@app.route('/Diabetis', methods=['POST'])
def Diabetis():
    try:
        # get the data from request
        req_data = request.get_json()
        data = req_data.get('data')
        print(f"Diabetis data recived from client...........", data)

        data_dict = {
            'Pregnancies': [int(data['Pregnancies'])],
            'Glucose': [int(data['Glucose'])],
            'BloodPressure': [int(data['BloodPressure'])],
            'SkinThickness': [int(data['SkinThickness'])],
            'Insulin': [int(data['Insulin'])],
            'BMI': [float(data['BMI'])],
            'DiabetesPedigreeFunction': [float(data['DiabetesPedigreeFunction'])],
            'Age': [int(data['Age'])],
        }
        
        # create a input as dataframe
        df = pd.DataFrame(data_dict)
        print('created dataframe:\n', df)

        # pridict the output by passing the input data to predict methos
        prd_data = diabetis_prd(df)
        prd_data_dict = {'prd_class': prd_data}
        print(f"response: {prd_data_dict}")

        # encode the data 
        encoded_data = jwt.encode(prd_data_dict, str(SECRET_KEY), algorithm='HS256') 

        return jsonify(encoded_data), 200   
     
    except Exception as e:
        raise CustomException(e, sys)


if __name__ == "__main__":
    app.run(debug=True)
 