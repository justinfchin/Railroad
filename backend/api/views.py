# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.template import loader
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


def __grab_list(the_model, the_serializer, request):
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

def __grab_detail(the_model, the_serializer, request, **kwargs):
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

def fare_types_list(request):
    """List all fare types, or create a new fare_type"""
    return __grab_list(FareTypes, FareTypesSerializer, request)

def fare_type_detail(request, fare_id):
    """
    Retrieve, update or delete a fare_type.
    """
    return __grab_detail(FareTypes, FareTypesSerializer, request, fare_id=fare_id)


def passengers_list(request):
    """List all passengers, or create a new passenger"""
    return __grab_list(Passengers, PassengersSerializer, request)

def passenger_detail(request, passenger_id):
    """
    Retrieve, update or delete a passenger.
    """
    return __grab_detail(Passengers, PassengersSerializer, request, passenger_id=passenger_id)


def reservations_list(request):
    return __grab_list(Reservations, ReservationsSerializer, request)

def reservation_detail(request, reservation_id):
    """
    Retrieve, update or delete a reservation.
    """
    return __grab_detail(Reservations, ReservationsSerializer, request, reservation_id=reservation_id)



def seats_free_list(request):
    return __grab_list(SeatsFree, SeatsFreeSerializer, request)

def seats_free_detail(request, seats_free_date):
    """
    Retrieve, update or delete a seats_free.
    """
    return __grab_detail(SeatsFree, SeatsFreeSerializer, request, seats_free_date=seats_free_date)


def segments_list(request):
    return __grab_list(Segments, SegmentsSerializer, request)

def segment_detail(request, segment_id):
    """
    Retrieve, update or delete a segment.
    """
    return __grab_detail(Segments, SegmentsSerializer, request, segment_id=segment_id)


def stations_list(request):
    return __grab_list(Stations, StationsSerializer, request)

def station_detail(request, station_id):
    return __grab_detail(Stations, StationsSerializer, request, station_id=station_id)

def station_detail_by_endpoints(request, station_start, station_end):
    return __grab_detail(Stations, StationsSerializer, request, station_id=station_id)


def stops_at_list(request):
    return __grab_list(StopsAt, StopsAtSerializer, request)

def stops_at_detail(request, train_id, station_id):
    return __grab_detail(StopsAt, StopsAtSerializer, request, train_id=train_id, station_id=station_id)


def trains_list(request):
    return __grab_list(Trains, TrainsSerializer, request)

def train_detail(request, train_id):
    """
    Retrieve, update or delete a train.
    """
    return __grab_detail(Trains, TrainsSerializer, request, train_id=train_id)


def trips_list(request):
    return __grab_list(Trips, TripsSerializer, request)

def trip_detail(request, trip_id):
    """
    Retrieve, update or delete a trip.
    """
    return __grab_detail(Trips, TripsSerializer, request, trip_id=trip_id)
