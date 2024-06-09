from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message':"Hello from flask"})

@app.route('/submit/code', methods=['POST'])
def submit_code():
    print("Received data.")
    data = request.get_json()
    print(data)
    return jsonify({'message': 'Data received successfully'})






def compile_cpp(file_path):
    output_file = file_path.split('.')[0]
    compile_command = ['g++', file_path, '-o', output_file]

    try:
        result = subprocess.run(compile_command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode == 0:
            print(f"Compilation successful. Output file: {output_file}")
        else:
            print(f"Compilation failed with return code {result.returncode}")
            print(result.stderr.decode())
    except subprocess.CalledProcessError as e:
        print("Compilation failed.")
        print(e.stderr.decode())






if __name__ == '__main__':
    app.run()