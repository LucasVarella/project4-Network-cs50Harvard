from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    img_banner = models.URLField(blank=True)
    img_url = models.URLField(blank=True)
    biography = models.CharField(max_length=150, blank=True)
    qtd_followers = models.IntegerField(default=0)
    qtd_following = models.IntegerField(default=0)
    posts_config = models.IntegerField(default=0)
    
    def count():
        pass
    

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=False)
    content = models.TextField(max_length=320)
    edited = models.BooleanField(default=False)
    
class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=False)
    
class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=False)
    following = models.IntegerField(blank= False)
