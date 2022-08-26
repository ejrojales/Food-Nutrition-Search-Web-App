from flask import Flask

app = Flask(__name__)
# Security Purposes CRSF token
app.config['SECRET_KEY'] = 'fb7757b0f36534b36c1e4f78d8a01a8c'
# routes file imports app variable. To avoid circular imports, import routes after initialization
from NutritionFinder import routes
