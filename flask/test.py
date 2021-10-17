from flask import Flask, request
import json
from flask_cors import CORS, cross_origin

import pandas
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
import pickle

from nltk.corpus import stopwords 
import re
from nltk.tokenize import TweetTokenizer

import nltk
nltk.download('punkt')
nltk.download('stopwords')
import numpy as np

from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk


app = Flask(__name__)
CORS(app)




@app.route('/detect', methods=['POST'])
@cross_origin()
def parse_request():
    data = request.json  # data is empty
    print(data['text'], flush=True)
    #print(predict_emotion(data['text'],loaded_model), flush=True)
    return "test"


if __name__ == "__main__":
    app.run(debug=True)