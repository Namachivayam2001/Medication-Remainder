import joblib
import pandas as pd
from components.utils import MyLabelEncoder
from exception import CustomException
from logger import logging 
import sys

def per_process(raw_data):        
    try:
        data = [
            raw_data
        ]
        df = pd.DataFrame(data)
        print('obes Dataframe created..........')
        preprocessor = joblib.load( 'playground-series-s4e2 (Obisity_pridiction)/preprocessor.pkl')
        print(f"obes preprocessor loded successfully..........")
        pre_data = preprocessor.transform(df)
        print(f"obes dataFrame preprocessed successfully..........")
        return pre_data
    except Exception as e :
        raise CustomException(e, sys)
 