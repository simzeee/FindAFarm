from flask.app import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):

    startDate = StringField('startDate', validators=[DataRequired()])
    endDate = StringField('endDate', validators=[DataRequired()])
    numberOfGuests = IntegerField('numberOfGuests', validators=[DataRequired()])