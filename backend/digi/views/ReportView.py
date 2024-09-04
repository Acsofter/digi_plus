from django.http import HttpResponse
from rest_framework.response import Response
from django.template.loader import render_to_string
import xhtml2pdf.pisa as pisa
from io import BytesIO
from rest_framework import viewsets, permissions, status
from ..serializers import  PaymentSerializerWithTicketDetails, CompanySerializer
from ..models import Company, Payment
from decimal import Decimal

class ReportViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated] # cambiar a adminuser
    serializer_class = PaymentSerializerWithTicketDetails

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        
        if user:
            return Payment.objects.filter(collaborator=int(user))
        return Response({'error': 'Debe indicar un usuario'}, status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        print(self.get_queryset())
        company = Company.objects.first()
        paymets_pending     = self.serializer_class(self.get_queryset().filter(status=1), many=True)
        payments_approved   = self.serializer_class(self.get_queryset().filter(status=2), many=True)
        payments_rejected   = self.serializer_class(self.get_queryset().filter(status=3), many=True)
        total_approved = sum([Decimal(payment["amount"]) for payment in payments_approved.data])
        collaborator_part = ((Decimal(100) - company.collaborator_percentage ) * total_approved) / Decimal(100) 
        company_part = total_approved - collaborator_part
        total_rejected = sum([Decimal(payment["amount"]) for payment in payments_rejected.data])
        total_pending  = sum([Decimal(payment["amount"]) for payment in paymets_pending.data])
       
        data = {
            'total': {
                'approved': total_approved,
                'rejected': total_rejected,
                'pending': total_pending,
                'company': company_part.quantize(Decimal('.01')),
                'neto': collaborator_part.quantize(Decimal('.01'))
            },
            'percentage': company.collaborator_percentage.to_integral(),
            'company': CompanySerializer(company).data ,
            'collaborator': serializer.data[0]['ticket']['collaborator'],
            'items': 
                [*payments_approved.data, *paymets_pending.data, *payments_rejected.data],
        }


        html = render_to_string('../templates/report.html', data)
        result = BytesIO()
        pdf = pisa.CreatePDF(BytesIO(html.encode("UTF-8")), dest=result)
        if pdf.err:
            return HttpResponse('Error al generar el PDF', status=500)

        response = HttpResponse(result.getvalue(), content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="reporte.pdf"'

        return response