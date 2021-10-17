from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/detect', methods=['GET', 'POST'])
def parse_request():
    data = request.json  # data is empty
    print(data)
    return data


if __name__ == "__main__":
    app.run(debug=True)