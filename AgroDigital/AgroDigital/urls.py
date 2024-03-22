from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include




from apps.cartillas.views import *
from apps.menu.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("django.contrib.auth.urls")),
    
    #path('login/', views.login_view, name='login'),
    #path('logout/', views.logout_view, name='logout'),
    #path('register/', views.register_view, name='register'),
    #path('menu_principal/', menu_principal_view, name='menu_principal_view'),
    path('',include('apps.menu.urls')),
]
