import subprocess
import os
import tempfile
import re
import time


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

string = "Test cases passed : 1 / Given Input : 82 35 83 90 47 46 64 94 71 95 70 38  / Expected Output : 48 / Your Output : 0"

print(extract_values(string))