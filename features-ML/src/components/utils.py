from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import LabelEncoder
import torch
from torch import nn

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

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
        self.fc1 = nn.Linear(128 * 28 * 28, 512)
        self.fc2 = nn.Linear(512, 2)  # 2 classes: normal and pneumonia

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = self.pool(torch.relu(self.conv3(x)))
        x = x.view(-1, 128 * 28 * 28) # reshape the theird layer output to single dimension
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x