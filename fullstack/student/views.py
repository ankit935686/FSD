from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout, authenticate
import json
from .models import Student
from social_django.utils import load_strategy, load_backend
from social_core.backends.oauth import BaseOAuth2
from social_core.exceptions import MissingBackend

# Create your views here.

@csrf_exempt
def register_student(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        student_id = data.get('student_id')
        
        if Student.objects.filter(username=username).exists():
            return JsonResponse({
                'status': 'error',
                'message': 'Username already exists'
            }, status=400)
            
        try:
            student = Student.objects.create_user(
                username=username,
                email=email,
                password=password,
                student_id=student_id
            )
            return JsonResponse({
                'status': 'success',
                'message': 'Student registered successfully',
                'data': {
                    'username': student.username,
                    'email': student.email,
                    'student_id': student.student_id
                }
            })
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Only POST method is allowed'
    }, status=405)

@csrf_exempt
def login_student(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({
                'status': 'success',
                'message': 'Login successful',
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'student_id': user.student_id
                }
            })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid credentials'
            }, status=401)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Only POST method is allowed'
    }, status=405)

@csrf_exempt
def logout_student(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({
            'status': 'success',
            'message': 'Logged out successfully'
        })
    
    return JsonResponse({
        'status': 'error',
        'message': 'Only POST method is allowed'
    }, status=405)

def get_student_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({
            'status': 'error',
            'message': 'Not authenticated'
        }, status=401)
    
    return JsonResponse({
        'status': 'success',
        'data': {
            'username': request.user.username,
            'email': request.user.email,
            'student_id': request.user.student_id
        }
    })

@csrf_exempt
def github_login(request):
    """Initiate GitHub OAuth login"""
    return JsonResponse({
        'status': 'success',
        'github_auth_url': f'/login/github/'
    })

@csrf_exempt
def github_callback(request):
    """Handle GitHub OAuth callback"""
    code = request.GET.get('code')
    if not code:
        return JsonResponse({
            'status': 'error',
            'message': 'No code provided'
        }, status=400)

    try:
        strategy = load_strategy(request)
        backend = load_backend(strategy=strategy, name='github', redirect_uri=None)
        
        # Complete the authentication process
        user = backend.complete(request=request)
        
        if user and user.is_active:
            login(request, user)
            return JsonResponse({
                'status': 'success',
                'message': 'GitHub login successful',
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'student_id': user.student_id if hasattr(user, 'student_id') else None
                }
            })
    except MissingBackend:
        return JsonResponse({
            'status': 'error',
            'message': 'Authentication failed'
        }, status=401)
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)
