from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from productos.models import Producto, Orden
from productos.serializers import Producto_Serializer, Orden_Serializer
import stripe
from django.http import JsonResponse
from django.conf import settings
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from  rest_framework import status

from django.db.models import Q
from rest_framework.generics import ListAPIView
from productos.models import Producto
from productos.serializers import Producto_Serializer



# Create your views here.

class FilterProductsView(ListAPIView):
    serializer_class = Producto_Serializer

    def get_queryset(self):
        queryset = Producto.objects.filter(activo=True)
        name = self.request.query_params.get('Name', None)
        price_order = self.request.query_params.get('Price', None)
        category_id = self.request.query_params.get('Category', None)
        
        # Filtrar por nombre si está presente
        if name:
            queryset = queryset.filter(nombre__icontains=name)

        # Filtrar por categoría si está presente
        if category_id:
            queryset = queryset.filter(id_categoria_id=category_id)
        
        # Ordenar por precio si está presente
        if price_order:
            if price_order == 'asc':
                queryset = queryset.order_by('precio')
            elif price_order == 'desc':
                queryset = queryset.order_by('-precio')

        return queryset


class Payments_View(APIView):
    stripe.api_key = settings.STRIPE_SECRET_KEY

    def post(self, request, *args, **kwargs):
        try:
            amount = request.data.get('amount', 1000)  
            
            # Create a PaymentIntent with Stripe
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd',
                automatic_payment_methods={'enabled': True},
            )

            return JsonResponse({
                'clientSecret': intent['client_secret']
            }, status=200)  # Asegúrate de devolver el status 200 para éxito
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

class VerifyPaymentView(APIView):
    stripe.api_key = settings.STRIPE_SECRET_KEY

    def post(self, request, *args, **kwargs):
        payment_intent_id = request.data.get('paymentIntentId')

        try:
            # Retrieve the payment intent from Stripe
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)

            # Check the status of the payment intent
            if intent['status'] == 'succeeded':
                # Payment was successful
                return JsonResponse({'success': True, 'message': 'Payment successful!'})
            else:
                # Payment was not successful
                return JsonResponse({'success': False, 'message': 'Payment failed!'})
        except Exception as e:
            return JsonResponse({'error': str(e)})


class Facturas_View(generics.CreateAPIView):
    
     queryset = Orden.objects.all()
     serializer_class=Orden_Serializer
          

class get_Producto_View(generics.ListCreateAPIView):
    queryset = Producto.objects.filter(activo=True)
    serializer_class=Producto_Serializer


class FilterDestacadoView(generics.ListCreateAPIView):
           queryset = Producto.objects.filter(activo=True, destacado=True)
           serializer_class=Producto_Serializer



class AscPrice(generics.ListCreateAPIView):
    serializer_class = Producto_Serializer

    def get_queryset(self):
        id = self.kwargs.get('id')  # obtener el id de la URL
        value = self.kwargs.get('value')  # obtener el valor (campo) de la URL
        order = self.request.GET.get('order', None)  # obtener 'order' como query param
        
        print(f"Received category ID: {id}, order: {order}")
        queryset = Producto.objects.filter(id_categoria_id=id, activo=True)
        
        if order == 'asc/':
            queryset = queryset.order_by(value)
        elif order == 'desc/':
            queryset = queryset.order_by(f"-{value}")
        
        return queryset

       

class SearchNameFilterView(ListAPIView):
     queryset = Producto.objects.all()
     serializer_class = Producto_Serializer
     lookup_field = 'nombre'
     def get_queryset(self):
          producto_busqueda = self.kwargs.get(self.lookup_field)

          return Producto.objects.filter(nombre=producto_busqueda)     
     


class DescPrice(generics.ListCreateAPIView):
       queryset = Producto.objects.all().order_by('-precio') 
       serializer_class=Producto_Serializer

class ProductNombre(generics.ListCreateAPIView):
       lookup_field='nombre'
       queryset = Producto.objects.filter(nombre=lookup_field)
       serializer_class=Producto_Serializer


class ToggleProductoActivoView(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    
    queryset = Producto.objects.all()
    serializer_class = Producto_Serializer
    lookup_field = 'id_producto'

    # Sobrescribimos el método update para alternar el valor de 'activo'
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Alternamos el valor de 'activo'
        instance.activo = not instance.activo
        instance.save()
        
        # Serializamos el objeto actualizado
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    
class EditView(generics.UpdateAPIView):
    authentication_classes= [TokenAuthentication]
    permission_classes = [IsAdminUser]

    queryset = Producto.objects.all()  # You want to update any Producto, not just the active ones
    serializer_class = Producto_Serializer

    def get_object(self):
        # This ensures that we fetch the correct object based on the primary key in the URL
        return generics.get_object_or_404(Producto, id_producto=self.kwargs.get('pk'))

    def update(self, request, *args, **kwargs):
        # Fetch the Producto object
        instance = self.get_object()

        # Use the serializer to handle the update logic
        serializer = self.get_serializer(instance, data=request.data, partial=False)  # `partial=False` ensures all fields must be provided

        # Validate the data
        serializer.is_valid(raise_exception=True)

        # Save the updated Producto
        self.perform_update(serializer)

        # Return the updated object as a response
        return Response(serializer.data)
    
class UpdateDestacado(generics.RetrieveUpdateDestroyAPIView):
     queryset = Producto.objects.all()
     serializer_class = Producto_Serializer
     lookup_field = 'id_producto'




    







