import subprocess
import os
import tempfile

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


code = """#include<bits/stdc++.h>
using namespace std;
int main(){
    cout<<"Hello";
    return 0;
}"""
print(compile_and_run_cpp(code))
