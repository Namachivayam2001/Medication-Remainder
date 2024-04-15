from PIL import Image
from torchvision import transforms
import torchvision.transforms as tt
from exception import CustomException
import sys

def preprocess_image(file):
    try:
        # Load the image using PIL
        img = Image.open(file)

        # Define the transformation pipeline
        data_transform = transforms.Compose([
            transforms.Resize((224, 224)),  # Resize images to 224x224
            transforms.ToTensor(),           # Convert images to tensors
            transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])  # Normalize images
        ])

        # Apply the transformations
        img_tensor = data_transform(img)

        # Add batch dimension
        img_tensor = img_tensor.unsqueeze(0)

        return img_tensor
    
    except Exception as e:
        raise CustomException(e, sys)
