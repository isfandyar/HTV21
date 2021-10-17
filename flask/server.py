from flask import Flask, request, jsonify
from flask_cors import CORS

import pickle

import detector2
from detector2 import predict_emotion



app = Flask(__name__)
CORS(app)


@app.route("/detect", methods=["GET", "POST"])
def predict():
    data = request.json  # data is the text

    loaded_model = pickle.load(open('flask/Model1_NLP.sav', 'rb'))
    loaded_tfidf = pickle.load(open('flask/tfidf.pickle', 'rb'))

    predictions = predict_emotion(data, loaded_model, loaded_tfidf)

    response = {
        'predictions': list(predictions)
    }

    return jsonify(response)




if __name__ == "__main__":
    app.run(port = "3000")