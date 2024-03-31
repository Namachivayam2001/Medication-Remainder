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