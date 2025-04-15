# import path to define URL routes
from django.urls import path
# import views.py to connect URL routes to Python
from . import views

# urlpatterns is a list of routes in this app
urlpatterns = [
    # If user goes to /api/search then run the 'search' function inside views.py
    path('search', views.search),
]