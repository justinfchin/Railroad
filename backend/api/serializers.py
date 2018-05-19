from rest_framework import serializers
from .models import FareTypes
from .models import Passengers
from .models import Reservations
from .models import SeatsFree
from .models import Segments
from .models import Stations
from .models import StopsAt
from .models import Trains
from .models import Trips

class FareTypesSerializer(serializers.ModelSerializer):
    """Serializes Tuples from the fare_types table in the railroad database"""
    class Meta:
        model = FareTypes
        fields = ('fare_id', 'fare_name', 'rate' )

class PassengersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passengers
        fields = ('passenger_id', 'fname', 'lname', 'email', 'password', 'preferred_card_number', 'preferred_billing_address' )
    
class ReservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservations
        fields = ('reservation_id', 'reservation_date', 'paying_passenger', 'card_number', 'billing_address' )
    
class SeatsFreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatsFree
        fields = ('train', 'segment', 'seat_free_date', 'freeseat' )
    
class SegmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Segments
        fields = ('segment_id', 'seg_n_end', 'seg_s_end', 'seg_fare' )
    
class StationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stations
        fields = ('station_id', 'station_name', 'station_symbol' )

class StopsAtSerializer(serializers.ModelSerializer):
    class Meta:
        model = StopsAt
        fields = ('train', 'station', 'time_in', 'time_out' )
    
class TrainsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trains
        fields = ('train_id', 'train_start', 'train_end', 'train_direction', 'train_days' )
    
class TripsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trips
        fields = ('trip_id', 'trip_date', 'trip_seg_start', 'trip_seg_ends', 'fare_type', 'fare', 'trip_train', 'reservation' )

