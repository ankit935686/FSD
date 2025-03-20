from django.urls import path, include
from . import views

urlpatterns = [
    path('api/register/', views.register_student, name='register'),
    path('api/login/', views.login_student, name='login'),
    path('api/logout/', views.logout_student, name='logout'),
    path('api/profile/', views.get_student_profile, name='profile'),
    path('api/github/login/', views.github_login, name='github-login'),
    path('api/github/callback/', views.github_callback, name='github-callback'),
    path('', include('social_django.urls', namespace='social')),
]
