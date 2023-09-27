import torch
from PIL import Image
from torchvision import datasets, models, transforms
from collections import deque
import requests
from io import BytesIO
import torch.nn.functional as F

# device 설정
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# 모델 불러오기
model_clf = torch.load('./models/model_clf.pth', map_location=device)
model_back = torch.load('./models/model_back.pth', map_location=device)
model_cover = torch.load('./models/model_cover.pth', map_location=device)
model_side = torch.load('./models/model_side.pth', map_location=device)


# 이미지를 1/10 크기로 축소하는 변환기 정의
class ResizeToFraction:
    def __init__(self, scale_factor):
        self.scale_factor = scale_factor

    def __call__(self, image):
        w, h = image.size
        new_w = int(w * self.scale_factor)
        new_h = int(h * self.scale_factor)
        return image.resize((new_w, new_h), Image.BILINEAR)

# 이미지 데이터 패딩
class PadToFixedSize:
    def __init__(self, output_size, padding_value=0):
        assert isinstance(output_size, (int, tuple))
        if isinstance(output_size, int):
            self.output_size = (output_size, output_size)
        else:
            self.output_size = output_size
        self.padding_value = padding_value

    def __call__(self, image):
        w, h = image.size

        # 원하는 출력 크기와 이미지 크기 간의 차이 계산
        delta_w = max(0, self.output_size[0] - w)
        delta_h = max(0, self.output_size[1] - h)

        # 패딩을 좌우, 상하에 반으로 분배
        pad_left = delta_w // 2
        pad_right = delta_w - pad_left
        pad_top = delta_h // 2
        pad_bottom = delta_h - pad_top

        # 패딩 적용
        padding = (pad_left, pad_top, pad_right, pad_bottom)
        image = transforms.functional.pad(image, padding, fill=self.padding_value)

        return image

# 이미지 url을 가져와서 텐서로 변환
def image_to_tensor(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        # 이미지 데이터를 BytesIO 객체로 읽기
        image_data = BytesIO(response.content)

        # BytesIO에서 이미지 열기
        image = Image.open(image_data)

    else:
        return False
    image_origin = Image.open(image_url)
    
    # 이미지 사이즈에 따라서 축소값 변경
    transforms_test = transforms.Compose([
        ResizeToFraction(0.1), # 이미지 크기 축소
        PadToFixedSize((600, 600)), # 이미지 패딩
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    image = transforms_test(image_origin).unsqueeze(0).to(device)

    return image

# 텐서를 받아서 예측, image_to_tensor의 리턴값이 인풋으로 들어가야함.
# 백 커버 사이드 예측
def clf_predict(image):
    with torch.no_grad():
    # 이미지 예측
        outputs = model_clf(image)
        _, preds = torch.max(outputs, 1)
    
    class_names = ['back','cover','side']
    return class_names[preds]

# 백 커버 사이드가 들어오면 이미지 한 장의 상태값을 반환
def status_predict(status, image):
    # class_names = ['best','high','low','medium']
    if status == 'back':
        model = model_back
    elif status == 'cover':
        model = model_cover
    elif status == 'side':
        model = model_side
    
    with torch.no_grad():
    # 이미지 예측
        outputs = model(image)
        logits = outputs[0]
        probabilities = F.softmax(logits, dim=0)
    original_list = probabilities.tolist()
    rounded_list = [round(x, 4) for x in original_list]
    return status, rounded_list


# 이미지 리스트를 받아 예측 후 back, cover, side, all의 예측상태값 반환
def get_image_status_by_image_list():
    pass

# 할일
# 1. 여기 코드 작성
# 2. 리턴값 확인, swagger로 확인해서 잘 넘어가는지
# 3. ans까지 마무리.