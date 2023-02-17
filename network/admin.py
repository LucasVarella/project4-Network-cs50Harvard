from django.contrib import admin

from .models import User, Post, Follow, Like

class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username")
    
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "user")

class FollowAdmin(admin.ModelAdmin):
    list_display = ("user", "following")
    
class LikeAdmin(admin.ModelAdmin):
    list_display = ("user", "post")

admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Follow, FollowAdmin)
admin.site.register(Like, LikeAdmin)