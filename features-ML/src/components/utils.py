from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import LabelEncoder

class MyLabelEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.encoders = {}

    def fit(self, X, y=None):
        for column in X.columns:
            self.encoders[column] = LabelEncoder().fit(X[column])
        return self

    def transform(self, X):
        X_encoded = X.copy()
        for column, encoder in self.encoders.items():
            X_encoded[column] = encoder.transform(X[column])
        return X_encoded

def convert_to_label_string(prd_data):
    # Define a dictionary mapping class indices to labels
    label_mapping = {
        0: 'Insufficient_weight',
        1: 'Normal_weight',
        2: 'Obesity_Type_1',
        3: 'Obesity_Type_2',
        4: 'Obesity_Type_3',
        5: 'Overweight_level_1',
        6: 'Overweight_level_2'
    }

    # Convert predicted indices to labels using the label mapping dictionary
    predicted_labels = [label_mapping[index] for index in prd_data]

    return predicted_labels[0]