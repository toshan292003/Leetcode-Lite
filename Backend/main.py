from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import tempfile
import re

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message':"Type code to return the square of a number"})

@app.route('/submit/code', methods=['POST'])
def submit_code():
    print("Received data.")
    data = request.get_json()
    data = data['code']
    code = ""
    code += data['declaration']
    code += data['function']
    code += data['main']

    ans = compile_and_run_cpp(code)
    print(ans)
    result = {
        'passed': False,
        'message': '',
        'para' : '',
        'test_cases_passed' : 0,
        'given_input': '',
        'expected_output': '',
        'your_output': ''
    }
    if(ans==None):
        result['message'] = 'Error in Compilation'
        result['passed'] = False
    elif(ans == 'Passed'):
        result['message'] = 'Right Answer'
        result['passed'] = True
    else:
        result['message'] = 'Wrong Answer'
        result['passed'] = False
        sample = extract_values(ans)
        print(sample)
        result['para'] = ans

    return jsonify(result)



def compile_and_run_cpp(cpp_code):
    # Create a temporary file to hold the C++ source code
    with tempfile.NamedTemporaryFile(delete=False, suffix=".cpp") as temp_source_file:
        temp_source_file.write(cpp_code.encode())
        temp_source_file_name = temp_source_file.name
    
    # Create a temporary file to hold the compiled executable with .exe extension
    temp_executable_file = tempfile.NamedTemporaryFile(delete=False, suffix=".exe")
    temp_executable_file_name = temp_executable_file.name
    temp_executable_file.close()
    
    try:
        # Compile the C++ code
        compile_result = subprocess.run(['g++', temp_source_file_name, '-o', temp_executable_file_name],
                                        check=True,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
        
        print("Compilation successful.")
        
        # Run the compiled executable and capture its output
        run_result = subprocess.run([temp_executable_file_name],
                                    check=True,
                                    stdout=subprocess.PIPE,
                                    stderr=subprocess.PIPE)
        
        output = run_result.stdout.decode()
        print("Execution successful.")
        return output
    except subprocess.CalledProcessError as e:
        print("Error during compilation or execution.")
        print(e.stderr.decode())
        return None
    finally:
        # Clean up the temporary files
        os.remove(temp_source_file_name)
        os.remove(temp_executable_file_name)




def extract_values(result_string):
    test_cases_passed = int(re.search(r'Test cases passed\s*:\s*(\d+)', result_string).group(1))
    given_input = re.search(r'Given Input\s*:\s*([^/]+)', result_string).group(1).strip()
    expected_output = re.search(r'Expected Output\s*:\s*([^/]+)', result_string).group(1).strip()
    your_output = re.search(r'Your Output\s*:\s*([^/]+)', result_string).group(1).strip()

    return {
        'test_cases_passed': test_cases_passed,
        'given_input': given_input,
        'expected_output': expected_output,
        'your_output': your_output
    }





if __name__ == '__main__':
    app.run()