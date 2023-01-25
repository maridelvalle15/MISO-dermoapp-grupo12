from flask import Flask
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
#Python-dotenv (Keep your secrets safe)

@app.route('/registro')
def registro():
    return "Endpoint registro on"