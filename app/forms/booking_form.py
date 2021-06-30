from flask.app import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):

    start_day = StringField('start_day', validators=[DataRequired()])
    end_day = StringField('end_day', validators=[DataRequired()])
    number_of_guests = IntegerField('number_of_guests', validators=[DataRequired()])
    submit = SubmitField('Create Booking')
