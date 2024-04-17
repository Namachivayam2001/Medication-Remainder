from components.utils import CNN
from exception import CustomException
from components.pneumoia_preprocess import preprocess_image
from logger import logging 
import torch
import sys

def pneumonia_prd(file):
    try:
        # Preprocess the image
        img_tensor = preprocess_image(file)

        # Instantiate the CNN model
        cnn_model = CNN()

        # Load the state dict
        state_dict = torch.load('Pneumonia_CNN\model_checkpoints\model_4.pth')
        print(f"CNN model loded successfully...........")

        # Load the state dict into the model
        cnn_model.load_state_dict(state_dict)
        print(f"state dict is save in curront model successfully..........")

        # Set the model to evaluation mode
        cnn_model.eval()

        # Perform prediction
        with torch.no_grad():
            prediction = cnn_model(img_tensor)
            print(f"model predicted successfully..........")

        # Get probabilities by applying softmax
        probabilities = torch.softmax(prediction, dim=1)
        print(f"Check the probability of the output..........")

        # Get predicted class index
        predicted_class_index = torch.argmax(probabilities, dim=1).item()

        # Assuming 0 represents 'normal' and 1 represents 'pneumonia'
        if predicted_class_index == 0:
            predicted_class = 'normal'
        else:
            predicted_class = 'pneumonia'

        return predicted_class
    
    except Exception as e:
        raise CustomException(e, sys)