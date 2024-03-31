import joblib
import pandas as pd
from utils import MyLabelEncoder


def per_process(raw_data):        
    try:
        data = [
            raw_data
        ]
        df = pd.DataFrame(data)
        print('Dataframe created..........\n', df)
        preprocessor = joblib.load( 'playground-series-s4e2 (Obisity_pridiction)\preprocessor.pkl')
        pre_data = preprocessor.transform(df)
        print(pre_data)
        return pre_data
    except Exception as e :
        print('hi', e)
