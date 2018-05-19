from django.conf.urls import url
#from .views import fare_types
import views
from .models import FareTypes
from .models import Passengers
from .models import Reservations
from .models import SeatsFree
from .models import Segments
from .models import Stations
from .models import StopsAt
from .models import Trains
from .models import Trips

# fare_types/                             : returns all the contents of the fare_types table.
# fare_types/<fare_id>/                   : returns tuple matching <fare_id>
#
# passengers/                             : returns all the contents of the passengers table.
# passengers/<passenger_id>/              : returns tuple matching <passenger_id>
#
# reservations/                           : returns all the contents of the reservations table.
# reservations/<reservation_id>/          : returns tuple matching <reservation_id>
#
# seats_free/                             : returns all the contents of the seats_free table.
# seats_free/<seat_free_date>/            : returns tuple matching <seat_free_date>
#
# segments/                               : returns all the contents of the segments table.
# segments/<segment_id>/                  : returns tuple matching <segment_id>
#
# stations/                               : returns all the contents of the stations table.
# stations/<station_id>/                  : returns tuple matching <station_id>
# stations/<station_start>/<station_end>/ : returns tuple matching <station_start> and <station_end>
#
# stops_at/                               : returns all the contents of the stops_at table.
# stops_at/<train_id>/<station_id>/       : returns tuple matching <train_id> and <station_id>
#
# trains/                                 : returns all the contents of the trains table.
# trains/<train_id>/                      : returns tuple matching <train_id>
#
# trips/                                  : returns all the contents of the trips table.
# trips/<trip_id>/                        : returns tuple matching <trip_id>

urlpatterns = [
    url(r'^$', views.spring_memes),
    url(r'^fare_types/$', views.fare_types_list),
    url(r'^fare_types/(?P<fare_id>[0-9]+)/$', views.fare_type_detail),

    url(r'^passengers/$', views.passengers_list),
    url(r'^passengers/(?P<passenger_id>[0-9]+)/$', views.passenger_detail),

    url(r'^reservations/$', views.reservations_list),
    url(r'^reservations/(?P<reservation_id>[0-9]+)/$', views.reservation_detail),
    
    url(r'^seats_free/$', views.seats_free_list),
    url(r'^seats_free/(?P<seat_free_date>[0-9]+)/$', views.seats_free_detail),
    
    url(r'^segments/$', views.segments_list),
    url(r'^segments/(?P<segment_id>[0-9]+)/$', views.segment_detail),
 
    url(r'^stations/$', views.stations_list),
    url(r'^stations/(?P<station_id>[0-9]+)/$', views.station_detail),
    url(r'^stations/(?P<station_start>[0-9]+)/(?P<station_end>[0-9]+)/$', views.station_detail_by_endpoints),
  
    url(r'^stops_at/$', views.stops_at_list),
    url(r'^stops_at/(?P<train_id>[0-9]+)/(?P<station_id>[0-9]+)/$', views.stops_at_detail),
   
    url(r'^trains/$', views.trains_list),
    url(r'^trains/(?P<train_id>[0-9]+)/$', views.train_detail),
    
    url(r'^trips/$', views.trips_list),
    url(r'^trips/(?P<trip_id>[0-9]+)/$', views.trip_detail),
]

