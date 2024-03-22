from django.shortcuts import render

from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout




def menu_principal_view(request):

    return render(request,'AgroDigital/templates/menu_principal.html')
