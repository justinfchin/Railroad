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

urlpatterns = [
    url(r'^$', views.spring_memes),
    url(r'^fare_types/$', views.fare_types_list),
    url(r'^fare_types/(?P<fare_id>[0-9]+)/$', views.fare_type_detail),

    url(r'^passengers/$', views.passengers_list),
    url(r'^passengers/(?P<passenger_id>[0-9]+)/$', views.passenger_detail),

    url(r'^reservations/$', views.reservations_list),
    url(r'^reservations/(?P<reservation_id>[0-9]+)/$', views.reservation_detail),
    
    url(r'^seats_free/$', views.seats_free_list),
    url(r'^seats_free/(?P<seat_free_date>[\d\-]+)/(?P<train_id>[\d\-]+)/(?P<segment_id>[\d\-]+)/$', views.seats_free_detail),
    url(r'^seats_free/(?P<seat_free_date>[\d\-]+)/(?P<start_station>[\d\-]+)/(?P<end_station>[\d\-]+)/(?P<train_id>[\d\-]+)/$', views.seats_free_on_trip),
    
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

# fare_types/                             
# fare_types/<fare_id>/                   
#                                                                                                                    
# passengers/                             
# passengers/<passenger_id>/              
#                                                                                                                    
# reservations/                           
# reservations/<reservation_id>/          
#                                                                                                                    
# seats_free/                             
# seats_free/<seat_free_date>/<train_id>/<segment_id>/ 
# seats_free/<seat_free_date>/<start_station>/<end_station>/<train_id>/                                 
#
# segments/                               
# segments/<segment_id>/                  
#                                                                                                                    
# stations/                               
# stations/<station_id>/                  
# stations/<station_start>/<station_end>/ 
#                                                                                                                    
# stops_at/                               
# stops_at/<train_id>/<station_id>/       
#                                                                                                                    
# trains/                                 
# trains/<train_id>/                      
#                                                                                                                    
# trips/                                  
# trips/<trip_id>/                        
