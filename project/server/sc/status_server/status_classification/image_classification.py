import torch
from PIL import Image
from torchvision import datasets, models, transforms
from collections import deque

# 모델 불러오기
model_load = torch.load('./models/model_ft_v1.pth')

# url = "../data/book_data/test/best/cm1_best (3).jpg"

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

def image_classification(image_url):
    image = Image.open(image_url)
    
    transforms_test = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    image = transforms_test(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model_load(image)
        _, preds = torch.max(outputs, 1)
    # class_names -> best,high,medium, low 임

    class_names = ['best', 'high', 'low', 'medium']
    return class_names[preds[0]]

def get_image_status_by_image_list(image_list):
    class_names = ['low', 'medium','high' ,'best']

    image_status = deque()
    
    for image_url in image_list:
        image_status.append(image_classification(image_url))
    
    status_degree = 0

    print(image_status)

    for status in image_status:
        if status == 'best':
            status_degree += 3
        elif status == 'high':
            status_degree += 2
        elif status == 'medium':
            status_degree += 1

    status_degree = status_degree / len(image_list)

    print(status_degree)
    print(int(status_degree))
    
    return class_names[int(status_degree)]