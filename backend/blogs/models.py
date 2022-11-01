from django.db import models
from users.models import User

class Blog(models.Model):
    body = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)