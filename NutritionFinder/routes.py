from flask import render_template, redirect, url_for, request, jsonify
from NutritionFinder import app
from NutritionFinder.forms import FoodSearchForm
import requests
import os
import json

# Key for USDA API use
API = "mSFhyAvJOPGKRVTLuMNGgeRriHC9FKhY35NvqusF"
user_foods = []


@app.route("/", methods=['GET', 'POST'])
def index():
    form = FoodSearchForm()
    if form.validate_on_submit():
        query = f'"{form.food.data}"'

        # API request for searching foods
        response = requests.get(
            f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={API}&query={query}")

        # convert the JSON content into a dictionary
        data = response.json()
        response.close()
        return results(data)
        # return render_template("results.html", data=data)
    return render_template("index.html", title='Home', form=form, user_foods=user_foods)


@app.route("/results", methods=['GET', 'POST'])
def results(data):
    return render_template("results.html", data=data, user_foods=user_foods)


@app.route("/nutrients/<fdcID>", methods=['GET', 'POST'])
def nutrients(fdcID):
    response = requests.get(
        f"https://api.nal.usda.gov/fdc/v1/food/{fdcID}?api_key={API}")
    response.raw.chunked = True
    response.encoding = 'utf-8'
    data = response.json()
    print(response.status_code)

    portion_size = dict()
    for info in data['foodPortions']:
        if 'portionDescription' in info:
            portion_size[f"{info['portionDescription']}"] = info['gramWeight']
        else:
            portion_size[f"{info['amount']} {info['modifier']}"] = info['gramWeight']
    response.close()
    return render_template("nutrients.html", title="Nutrition Information", data=data, portion_size=portion_size, user_foods=user_foods)


@app.route("/ProcessUserInfo/<string:user_info>", methods=['POST'])
def ProcessUserInfo(user_info):
    userinfo = json.loads(user_info)
    foods = userinfo
    user_foods.append(foods)
    return('/')


@app.route("/clearFoodList", methods=['GET'])
def clear_food_list():
    if request.method == 'GET':
        user_foods.clear()
        return '/'
