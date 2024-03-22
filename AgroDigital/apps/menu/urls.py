from django.urls import path
from . import views

urlpatterns = [
	path('menu_principal', views.menu_principal_view, name= "menu_principal_view")
]



