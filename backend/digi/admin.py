from django.contrib import admin
from .models import User, Company, Ticket, Category, Payment

admin.site.register(Company)
admin.site.register(Payment)
admin.site.register(User)
admin.site.register(Ticket)
admin.site.register(Category)

