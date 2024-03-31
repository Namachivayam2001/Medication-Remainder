import joblib
from obes_preprocess import per_process
from utils import MyLabelEncoder

def predict(raw_data): 
    try:
        pre_process_data = per_process(raw_data)
        print(f'preprocessed data:\n {pre_process_data}')
        # Load the model
        model = joblib.load( 'playground-series-s4e2 (Obisity_pridiction)\model.pkl')
        # Use the model for predictions
        prd_data = model.predict(pre_process_data)
        print(f'predicted output: {prd_data}')  
    except Exception as e:
        print(e)

raw_data = {'id': 1, 'Age': '40', 'Gender': 'Male', 'Height': '1', 'Weight': '150', 'FCVC': '1', 'NCP': '1', 'FAF': '1', 'CH2O': '1', 'TUE': '1', 'family_history_with_overweight': 'no', 'FAVC': 'yes', 'SCC': 'yes', 'CALC': 'Sometimes', 'CAEC': 'Frequently', 'MTRANS': 'Bicycle', 'SMOKE': 'yes'}        
predict(raw_data)