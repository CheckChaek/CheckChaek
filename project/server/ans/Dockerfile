FROM python:3.11

RUN pip install django
RUN pip install djangorestframework
RUN pip install drf-yasg
RUN pip install torch
RUN pip install torchvision

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/analysis

CMD ["python", "manage.py", "runserver","--noreload", "8086"]

EXPOSE 8086