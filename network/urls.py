
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile", views.my_profile, name="myprofile"),
    path("profile/<str:user>", views.profile, name="profile"),
    path("foryou", views.foryou, name="foryou"),
    path("following", views.following, name="following"),
     
    # API Routes
    path("newpost", views.new_post, name="newpost"),
    path("edit/<int:id>", views.edit_post, name="edit"),
    path("getuser", views.get_user, name="getuser"),
]
