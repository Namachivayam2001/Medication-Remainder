import joblib
from logger import logging 
from exception import CustomException
import sys
import os

def diabetis_prd(data):
    try:
        # set path of .pkl file
        path = os.path.realpath(r'../diabetis_prediction/model/model.pkl')

        # load the model
        model = joblib.load(path)
        print(f"diabetis model loded successfully..........")

        # Use the model for predictions
        prd_data = model.predict(data)
        print(f"diabetis predicted successfully..........") 

        if(prd_data == 1):
            return 'YES'
        else:
            return 'NO'
    
    except Exception as e:
        raise CustomException(e, sys)