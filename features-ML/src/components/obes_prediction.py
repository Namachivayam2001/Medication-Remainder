import joblib
from components.obes_preprocess import per_process
from components.utils import MyLabelEncoder
from exception import CustomException
import sys

def predict(raw_data): 
    try:
        pre_process_data = per_process(raw_data)
        print(f'preprocessed data:\n {pre_process_data}')
        # Load the model
        model = joblib.load( 'playground-series-s4e2 (Obisity_pridiction)\model.pkl')
        # Use the model for predictions
        prd_data = model.predict(pre_process_data)
        print(f'predicted output: {prd_data}')  
        return prd_data
    except Exception as e:
        raise CustomException(e, sys)