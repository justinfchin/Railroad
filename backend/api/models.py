# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class FareTypes(models.Model):
    fare_id = models.AutoField(primary_key=True)
    fare_name = models.CharField(max_length=20, blank=True, null=True)
    rate = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fare_types'


class Passengers(models.Model):
    passenger_id = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=30, blank=True, null=True)
    lname = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    preferred_card_number = models.CharField(max_length=16, blank=True, null=True)
    preferred_billing_address = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'passengers'


class Reservations(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    reservation_date = models.DateTimeField(blank=True, null=True)
    paying_passenger = models.ForeignKey(Passengers, models.DO_NOTHING)
    card_number = models.CharField(max_length=16, blank=True, null=True)
    billing_address = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservations'


class SeatsFree(models.Model):
    train = models.ForeignKey('Trains', models.DO_NOTHING, primary_key=True)
    segment = models.ForeignKey('Segments', models.DO_NOTHING)
    seat_free_date = models.DateField()
    freeseat = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'seats_free'
        unique_together = (('train', 'segment', 'seat_free_date'),)


class Segments(models.Model):
    segment_id = models.AutoField(primary_key=True)
    seg_n_end = models.ForeignKey('Stations', models.DO_NOTHING, db_column='seg_n_end', related_name="north_end")
    seg_s_end = models.ForeignKey('Stations', models.DO_NOTHING, db_column='seg_s_end', related_name="south_end")
    seg_fare = models.DecimalField(max_digits=7, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'segments'


class Stations(models.Model):
    station_id = models.AutoField(primary_key=True)
    station_name = models.CharField(max_length=40)
    station_symbol = models.CharField(unique=True, max_length=3)

    class Meta:
        managed = False
        db_table = 'stations'


class StopsAt(models.Model):
    train = models.ForeignKey('Trains', models.DO_NOTHING, primary_key=True)
    station = models.ForeignKey(Stations, models.DO_NOTHING)
    time_in = models.TimeField(blank=True, null=True)
    time_out = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops_at'
        unique_together = (('train', 'station'),)


class Trains(models.Model):
    train_id = models.AutoField(primary_key=True)
    train_start = models.ForeignKey(Stations, models.DO_NOTHING, db_column='train_start', related_name='train_start')
    train_end = models.ForeignKey(Stations, models.DO_NOTHING, db_column='train_end', related_name='train_end')
    train_direction = models.IntegerField(blank=True, null=True)
    train_days = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trains'


class Trips(models.Model):
    trip_id = models.AutoField(primary_key=True)
    trip_date = models.DateField()
    trip_seg_start = models.ForeignKey(Segments, models.DO_NOTHING, db_column='trip_seg_start', related_name='trip_seg_start')
    trip_seg_end = models.ForeignKey(Segments, models.DO_NOTHING, db_column='trip_seg_end', related_name='trip_seg_end')
    fare_type = models.ForeignKey(FareTypes, models.DO_NOTHING, db_column='fare_type')
    fare = models.DecimalField(max_digits=7, decimal_places=2)
    trip_train = models.ForeignKey(Trains, models.DO_NOTHING)
    reservation = models.ForeignKey(Reservations, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'trips'
