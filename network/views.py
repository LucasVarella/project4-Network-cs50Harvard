import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.urls import reverse

from datetime import datetime

from .models import User, Post, Like, Follow


def index(request):
    
    if request.method == "GET":
        user = request.user
        if user.is_authenticated:
            return HttpResponseRedirect(reverse("foryou"))
        else:
            return HttpResponseRedirect(reverse("login"))


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def my_profile(request):
    
    user = request.user
    if user.is_authenticated:
        my_posts = Post.objects.filter(user= user)
        return render(request, "network/profile.html", {
            "user": user, "posts": my_posts
        })
    else:
        return HttpResponseRedirect(reverse("login"))


def profile(request, user):
    
    user_profile = User.objects.get(username=user)
    posts = Post.objects.filter(user= user_profile)
    qtd_posts = 0
   
    
    following = True
    try:
        follow = Follow.objects.get(user = request.user, following= user_profile.id)
    except:
        following = False
        
    return render(request, "network/profile.html", {
        "user": user_profile, "posts": posts, "following": following, "qtd_posts": qtd_posts
    })

def foryou(request):
    if request.user.is_authenticated:
        
        config = request.user.posts_config
        posts = Post.objects.all
        
        if config == 0:
            return render(request, "network/index.html", {
                "posts": posts
            })
            
        else:
            return render(request, "network/index.html", {
                "posts": posts
            })
        
    else:
        return HttpResponseRedirect(reverse("login"))

@csrf_exempt
def following(request):
    
    user = request.user
    
    if user.is_authenticated:
        
        if request.method == "POST":
            
            
            
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            id_profile = body['id_profile']
            profile_user = User.objects.get(pk= id_profile)
            
            follow_status = True
            try:
                follow = Follow.objects.get(user= user, following= id_profile)
            except:
                follow_status = False
                
            if follow_status == True:
                follow.delete()
                profile_user.qtd_followers -=1
                profile_user.save()
                qtd_followers = profile_user.qtd_followers
                return JsonResponse({"result": "Sucess unfollowed user", "qtd_followers": qtd_followers}, status=200)
            else:        
                add_follow = Follow(user= user, following=id_profile)
                add_follow.save()
                profile_user.qtd_followers +=1
                profile_user.save()
                qtd_followers = profile_user.qtd_followers
                return JsonResponse({"result": "Sucess followed user", "qtd_followers": qtd_followers}, status=200)
        
        else:
            config = request.user.posts_config
            follow_list = Follow.objects.filter(user= request.user)
            following = []
            posts = []
            
            for follow in follow_list:
                user = User.objects.get(pk = follow.following)
                posts_user = Post.objects.filter(user= user)
                
                for post in posts_user:
                    posts.append(post)
            
            if config == 0:
                return render(request, "network/index.html", {
                    "posts": posts
                })
                
            else:
                return render(request, "network/index.html", {
                    "posts": posts
                })
    else:
        return HttpResponseRedirect(reverse("login"))

@login_required
@csrf_exempt
def new_post(request):
    
    # New post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content = body['content']

    
    post = Post(user= request.user, content= content)
    post.save()
    user = request.user
    return JsonResponse({"result": "Posted with success!", "user_img": user.img_url, "user_name": user.username, "id": post.id}, status=200)
    
@login_required
@csrf_exempt
def edit_post(request, id):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required."}, status=400)
    else:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        content = body['content']
        
        post = Post.objects.get(pk=id)
        post.edited = True
        post.content = content
        post.save()
        
        return JsonResponse({"result": "Edited with success!", "edited": post.edited}, status=200)     

@login_required
def get_user(request):
    
    # New post must be via GET
    if request.method == "POST":
        return JsonResponse({"error": "GET request required."}, status=400)
    
    user = request.user
    return JsonResponse({"user": str(user.username), "img_url": str(user.img_url), "biography": user.biography ,"qtd_followers": user.qtd_followers, "qtd_following": user.qtd_following}, status=200)
    
    