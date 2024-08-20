
from rest_framework import serializers
from .models import Category, Company, Payment, Ticket, User
from django.shortcuts import get_object_or_404
from django.db import models


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    # token = serializers.CharField(max_length=255, read_only=True)
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    roles = serializers.SerializerMethodField(read_only=True)

    def get_roles(self, obj):
        return obj.get_roles()
    

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'password', 'roles', 'first_name', 'last_name', 'color']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        return super().validate(attrs)

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token', 'first_name', 'last_name', 'color']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class RegistrationSuperUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token']

    def create(self, validated_data):
        return User.objects.create_superuser(**validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username:
            raise serializers.ValidationError('Especificar el usuario')
        if not password:
            raise serializers.ValidationError('Especificar la contraseña')

        user = get_object_or_404(User, username=username)
        
        if not user.check_password(password):
            print("password:", password, "user.password:", user.password)
            raise serializers.ValidationError('Credenciales incorrectas')

        if not user.is_active:
            raise serializers.ValidationError('Este usuario se encuentra suspendido')

        return {
            'username': user.username,
            'token': user.token,
            'email': user.email,
            'id': user.id
        }
    


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

    
    


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"



class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class PaymentSerializerWithTicketDetails(serializers.ModelSerializer):
    ticket = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = "__all__"

    def get_ticket(self, obj):
        try:
            ticket_found = Ticket.objects.get(payment=obj.id)
        except models.ObjectDoesNotExist:
            return {}


        return {
            'id': ticket_found.id,
            'description': ticket_found.description,
            'colaborator': UserSerializer(ticket_found.colaborator).data,
            'category': CategorySerializer(ticket_found.category).data,
            'created_at': ticket_found.created_at

        }

        

class TicketSerializer(serializers.ModelSerializer):
    
    payment = serializers.PrimaryKeyRelatedField(queryset=Payment.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    colaborator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Ticket
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']
        fields = "__all__"
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['payment'] = PaymentSerializer(instance.payment).data
        representation['category'] = CategorySerializer(instance.category).data
        representation['colaborator'] = UserSerializer(instance.colaborator).data
        return representation


    def create(self, validated_data):
        print(validated_data)
        validated_data['company'] = Company.objects.first()
        ticket_created = Ticket.objects.create(**validated_data)
        return ticket_created
    
   
        
class MetricsSerializer(serializers.Serializer):
    today = serializers.SerializerMethodField(read_only=True)
    week = serializers.SerializerMethodField(read_only=True)
    month = serializers.SerializerMethodField(read_only=True)

    def calculate_metrics(self, data):
        try:
            company = Company.objects.first()
            tickets = data.count()
            if tickets == 0:
                return {
                    'tickets': 0,
                    'gross': 0,
                    'net': 0
                }
            gross = sum([ticket.payment.amount for ticket in data])

            net = (company.colaborator_percentage * gross) // 100
            
            company = Company.objects.first()

            return {
                'tickets': data.count(),
                'gross': gross,
                'net': net
            }

        except Exception as e:
            serializers.ValidationError(str(e))            


    def get_today(self, obj):

        today_data = obj.get('today', None)

        if today_data is None:
            raise serializers.ValidationError("'today' key is None in input data")
        
        try:
            aproved = self.calculate_metrics(today_data)
            total = self.calculate_metrics(today_data.filter(payment__status=2))
            result = {key: {"approved": aproved[key], "total": total[key]} for key in aproved}

            return result
        except Exception as e:
            raise serializers.ValidationError(str(e))
        

    def get_week(self, obj):

        week_data = obj.get('week', None)
        if week_data is None:
            raise serializers.ValidationError("'week' key is None in input data")

        try:
            aproved = self.calculate_metrics(week_data)
            total = self.calculate_metrics(week_data.filter(payment__status=2))
            result = {key: {"approved": aproved[key], "total": total[key]} for key in aproved}

            return result
        except Exception as e:
            raise serializers.ValidationError(str(e))

    def get_month(self, obj):
       
        month_data = obj.get('month', None)
        if month_data is None:
            raise serializers.ValidationError("'month' key is None in input data")
        
        try:
            aproved = self.calculate_metrics(month_data)
            total = self.calculate_metrics(month_data.filter(payment__status=2))
            result = {key: {"approved": aproved[key], "total": total[key]} for key in aproved}

            return result
        except Exception as e:
            raise serializers.ValidationError(str(e))


  
