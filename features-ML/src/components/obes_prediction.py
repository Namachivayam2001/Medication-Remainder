import joblib
from components.obes_preprocess import pre_process
from components.utils import MyLabelEncoder
from logger import logging 
from exception import CustomException
import sys
import os

def predict(raw_data): 
    try:
        pre_process_data = pre_process(raw_data)

        # set path of .pkl file
        path = os.path.realpath(r'../playground-series-s4e2 (Obisity_pridiction)/model.pkl')

        # Load the model
        model = joblib.load(path)
        print(f"obes model loded successfully..........")

        # Use the model for predictions
        prd_data = model.predict(pre_process_data)
        print(f"obes level predicted successfully..........")  

        return prd_data
    
    except Exception as e:
        raise CustomException(e, sys)