# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import FareTypes
from .models import Passengers
from .models import Reservations
from .models import SeatsFree
from .models import Segments
from .models import Stations
from .models import StopsAt
from .models import Trains
from .models import Trips
from .serializers import FareTypesSerializer
from .serializers import PassengersSerializer
from .serializers import ReservationsSerializer
from .serializers import SeatsFreeSerializer
from .serializers import SegmentsSerializer
from .serializers import StationsSerializer
from .serializers import StopsAtSerializer
from .serializers import TrainsSerializer
from .serializers import TripsSerializer


def __endpoint_list(the_model, the_serializer, request):
    if request.method == 'GET':
        objects = the_model.objects.all()
        serializer = the_serializer(objects, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = the_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

def __endpoint_detail(the_model, the_serializer, request, **kwargs):
    try:
        objects = the_model.objects.get(**kwargs)
    except the_model.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = the_serializer(objects)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = the_serializer(objects, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        objects.delete()
        return HttpResponse(status=204)


def spring_memes(request):
    temp = loader.get_template("index.html")
    return HttpResponse(temp.render())


@csrf_exempt
def fare_types_list(request):
    """List all fare types, or create a new fare_type"""
    return __endpoint_list(FareTypes, FareTypesSerializer, request)

@csrf_exempt
def fare_type_detail(request, fare_id):
    """
    Retrieve, update or delete a fare_type.
    """
    return __endpoint_detail(FareTypes, FareTypesSerializer, request, fare_id=fare_id)

@csrf_exempt
def calc_trip_fare(request, trip_date, start_station, end_station, reg_adults, mt_adults, senior, children, pets):
    """
    Calculates fare for a trip.
    """
    fare = None
    gbg = None
    with connection.cursor() as cursor:
        args = cursor.callproc('calc_fare_for_trip', [trip_date, start_station, end_station, reg_adults, mt_adults, senior, children, pets, gbg])
        tmp = cursor.fetchall()
        fare = tmp[0][0]
    return JsonResponse({'fare': fare})


@csrf_exempt
def passengers_list(request):
    """List all passengers, or create a new passenger"""
    return __endpoint_list(Passengers, PassengersSerializer, request)

@csrf_exempt
def passenger_detail(request, passenger_id):
    """
    Retrieve, update or delete a passenger.
    """
    return __endpoint_detail(Passengers, PassengersSerializer, request, passenger_id=passenger_id)


@csrf_exempt
def reservations_list(request):
    return __endpoint_list(Reservations, ReservationsSerializer, request)

@csrf_exempt
def reservation_detail(request, reservation_id):
    """
    Retrieve, update or delete a reservation.
    """
    return __endpoint_detail(Reservations, ReservationsSerializer, request, reservation_id=reservation_id)



@csrf_exempt
def seats_free_list(request):
    return __endpoint_list(SeatsFree, SeatsFreeSerializer, request)

@csrf_exempt
def seats_free_detail(request, seat_free_date, train_id, segment_id):
    return __endpoint_detail(SeatsFree, SeatsFreeSerializer, request, seat_free_date=seat_free_date)

@csrf_exempt
def seats_free_on_trip(request, seat_free_date, start_station, end_station, train_id):
    seats_free = None
    with connection.cursor() as cursor:
        args = cursor.callproc('calc_seats_free', [start_station, end_station, seat_free_date, train_id, seats_free])
        seats_free = cursor.fetchall()[0][0]
    return JsonResponse({'seats_free': seats_free})


@csrf_exempt
def segments_list(request):
    return __endpoint_list(Segments, SegmentsSerializer, request)

@csrf_exempt
def segment_detail(request, segment_id):
    """
    Retrieve, update or delete a segment.
    """
    return __endpoint_detail(Segments, SegmentsSerializer, request, segment_id=segment_id)


@csrf_exempt
def stations_list(request):
    return __endpoint_list(Stations, StationsSerializer, request)

@csrf_exempt
def station_detail(request, station_id):
    return __endpoint_detail(Stations, StationsSerializer, request, station_id=station_id)

@csrf_exempt
def station_detail_by_endpoints(request, station_start, station_end):
    return __endpoint_detail(Stations, StationsSerializer, request, station_id=station_id)


@csrf_exempt
def stops_at_list(request):
    return __endpoint_list(StopsAt, StopsAtSerializer, request)

@csrf_exempt
def stops_at_detail(request, train_id, station_id):
    return __endpoint_detail(StopsAt, StopsAtSerializer, request, train_id=train_id, station_id=station_id)


@csrf_exempt
def trains_list(request):
    return __endpoint_list(Trains, TrainsSerializer, request)

@csrf_exempt
def train_detail(request, train_id):
    """
    Retrieve, update or delete a train.
    """
    return __endpoint_detail(Trains, TrainsSerializer, request, train_id=train_id)


@csrf_exempt
def trips_list(request):
    return __endpoint_list(Trips, TripsSerializer, request)

@csrf_exempt
def trip_detail(request, trip_id):
    """
    Retrieve, update or delete a trip.
    """
    return __endpoint_detail(Trips, TripsSerializer, request, trip_id=trip_id)
