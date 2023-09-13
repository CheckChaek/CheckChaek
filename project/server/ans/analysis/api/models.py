from django.db import models

class image_status(models.Model):
    image_status = models.CharField(max_length=10, default="Unknown")
    image_title = models.CharField(max_length=100, default="Unknown")
    image_publisher = models.CharField(max_length=100, default="Unknown")
    image_author = models.CharField(max_length=100, default="Unknown")
    image_price = models.IntegerField(default=0)