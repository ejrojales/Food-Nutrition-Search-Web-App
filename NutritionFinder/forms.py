from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class FoodSearchForm(FlaskForm):
    food = StringField("Search Food", validators=[DataRequired()])
