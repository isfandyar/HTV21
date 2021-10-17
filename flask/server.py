from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/detect", methods=["GET", "POST"])
def predict():
    data = request.json  # data is the text

    return "Hello, cross-origin-world!"


if __name__ == "__main__":
    app.run(debug=True)