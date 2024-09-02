from django.shortcuts import get_object_or_404

from ..pagination import PaymentPagination
from ..models import Payment
from ..serializers import PaymentSerializerWithTicketDetails
from rest_framework import permissions, mixins, viewsets, status
from rest_framework.response import Response


class PaymentViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializerWithTicketDetails
    pagination_class = PaymentPagination
   

    def get_queryset(self):
        if self.request.user.is_staff:
            queryset = Payment.objects.all()
        else:
            queryset = Payment.objects.filter(collaborator=self.request.user)
        return queryset.order_by('-created_at')
    
    def retrieve(self, request, pk=None):
        payment = get_object_or_404(Payment, pk=pk)
        return Response(self.serializer_class(payment).data, status=status.HTTP_200_OK)
    

    

    


