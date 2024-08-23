from ..pagination import TicketPagination
from ..models import Payment
from ..serializers import PaymentSerializerWithTicketDetails
from rest_framework import permissions, mixins, viewsets


class PaymentViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializerWithTicketDetails
    pagination_class = TicketPagination
   

    def get_queryset(self):
        if self.request.user.is_staff:
            queryset = Payment.objects.all()
        else:
            queryset = Payment.objects.filter(collaborator=self.request.user)
        return queryset.order_by('-created_at')
    

    

    


