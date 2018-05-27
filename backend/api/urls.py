from django.conf.urls import url
import views

urlpatterns = [
    url(r'^$',
	views.spring_memes),

    url(r'^fare_types/$',
	views.fare_types_list),
    url(r'^fare_types/(?P<fare_id>[0-9]+)/$',
	views.fare_type_detail),

    url(r'^calc_trip_fare/(?P<trip_date>[\d\-]+)/(?P<start_station>[0-9]+)/(?P<end_station>[0-9]+)/(?P<reg_adults>[0-9]+)/(?P<mt_adults>[0-9]+)/(?P<senior>[0-9]+)/(?P<children>[0-9]+)/(?P<pets>[0-9]+)/$',
	views.calc_trip_fare),

    url(r'^update_seats_free/(?P<train_id_p>[0-9]+)/(?P<trip_date>[\d\-]+)/(?P<origin>[0-9]+)/(?P<destination>[0-9]+)/(?P<num_of_passengers>[0-9]+)/$',
	views.update_seats_free),


    url(r'^passengers/$',
	views.passengers_list),
    url(r'^passengers/(?P<passenger_id>[0-9]+)/$',
	views.passenger_detail),

    url(r'^reservations/$',
	views.reservations_list),
    url(r'^reservations/(?P<reservation_id>[0-9]+)/$',
	views.reservation_detail),
    
    url(r'^seats_free/$',
	views.seats_free_list),
    url(r'^seats_free/(?P<seat_free_date>[\d\-]+)/(?P<train_id>[\d\-]+)/(?P<segment_id>[\d\-]+)/$',
	views.seats_free_detail),
    url(r'^seats_free/(?P<seat_free_date>[\d\-]+)/(?P<start_station>[\d\-]+)/(?P<end_station>[\d\-]+)/(?P<train_id>[\d\-]+)/$',
	views.seats_free_on_trip),
    
    url(r'^segments/$',
	views.segments_list),
    url(r'^segments/(?P<segment_id>[0-9]+)/$',
	views.segment_detail),
 
    url(r'^stations/$',
	views.stations_list),
    url(r'^stations/(?P<station_id>[0-9]+)/$',
	views.station_detail),
    url(r'^stations/(?P<station_start>[0-9]+)/(?P<station_end>[0-9]+)/$',
	views.station_detail_by_endpoints),
  
    url(r'^stops_at/$',
	views.stops_at_list),
    url(r'^stops_at/(?P<train_id>[0-9]+)/(?P<station_id>[0-9]+)/$',
	views.stops_at_detail),
   
    url(r'^trains/$',
	views.trains_list),
    url(r'^trains/(?P<train_id>[0-9]+)/$',
	views.train_detail),
    
    url(r'^trips/$',
	views.trips_list),
    url(r'^trips/(?P<trip_id>[0-9]+)/$',
	views.trip_detail),
]
