from flask import Flask, jsonify ,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    code = request.args.get('code', '')
    data = {'code': code}
    return jsonify(data)

@app.route('/submit/code', methods=['POST'])
def submit_code():
    data = request.get_json()
    print(data['code'])
    if 'code' not in data:
        return jsonify({"error": "No code field provided"}), 400
    
    code = data['code']
    code_upper = code.upper()
    print("Received data:", code)
    print("Converted to uppercase:", code_upper)
    
    return jsonify({"code": code_upper})





@app.route('/code', methods=['GET'])
def cd(c):   
    return jsonify({"code":c})


def get_data_with_code(code):
    data = {'code': code}
    return jsonify(data)





if __name__ == '__main__':
    app.run()