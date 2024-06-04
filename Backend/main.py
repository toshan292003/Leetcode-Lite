from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

@app.route('/submit/code', methods=['POST'])
def submit_code():
    print("Received data.")
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run()