FROM python:3.11

RUN pip install django
RUN pip install djangorestframework
RUN pip install drf-yasg
RUN pip install torch
RUN pip install torchvision
RUN pip install requests

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/status_server

CMD ["python", "manage.py", "runserver","--noreload", "0.0.0.0:8000"]

EXPOSE 8000