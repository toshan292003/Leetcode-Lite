import React, { useState, useEffect } from "react";
import axios from "axios";

import "./solve.css";

export default function Solve() {

  const [lvlcolor, setlvlcolor] = useState("#FFFFFF");
  const [outcolor, setoutcolor] = useState({
    text: "white",
    back: "#545454"
  });
  const [code, setcode] = useState({
    problem: "Square of a Number",
    level: "Easy",
    description: {
      PS: [
        "Return the Square of a given number",
        "Square of a number is defined by the product of the number by itself",
      ],
      Examples: [
        {
          Input: "a = 4",
          Output: "16",
          Explanation: "4 x 4 = 16",
        },
        {
          Input: "a = 15",
          Output: "225",
          Explanation: "15 x 15 = 225",
        },
        {
          Input: "a = 35",
          Output: "1225",
          Explanation: "35 x 35 = 1225",
        },
      ],
    },
    declaration: `#include<bits/stdc++.h>
    using namespace std;`,
    function: `int square(int a){
    
}`,
    main: `int main()
{
    int a[50] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50};
    int ans[50] = {1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676,729,784,841,900,961,1024,1089,1156,1225,1296,1369,1444,1521,1600,1681,1764,1849,1936,2025,2116,2209,2304,2401,2500};

    for(int i=0;i<50;i++){
      int res = square(a[i]);
        if(res != ans[i]){
            cout<<"Test cases passed : "<<i<<" / ";
            cout<<"Given Input : "<<a[i]<<" / ";
            cout<<"Expected Output : "<<ans[i]<<" / ";
            cout<<"Your Output : "<<res;
            return 0;
        }
    }

    cout<<"Passed";
    return 0;
}`,
  });
  const [response, setresponse] = useState({
    passed: true,
    message: "Run Your code to get Execution details",
    para: "",
    test_cases_passed: 0,
    given_input: "",
    expected_output: "",
    your_output: "",
  });

  useEffect(() => {
    if (code.level.toLocaleLowerCase() == "easy") {
      setlvlcolor("#46C6A9");
    }
    else if (code.level.toLocaleLowerCase() == "medium") {
      setlvlcolor("#FFA115");
    }
    else if (code.level.toLocaleLowerCase() == "hard") {
      setlvlcolor("#f5334a");
    }

    return () => {

    };
  });

  const changeCode = (event) => {
    setcode((prevstate) => ({
      ...prevstate,
      function: event.target.value,
    }));
    console.log(code);
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/submit/code", {
        code: code,
      })
      .then((res) => {
        console.log(res.data);
        setresponse(res.data);
        console.log(res.data.message);
        if (res.data.message === "Right Answer") {
          console.log("Entered Statement Right answer");
          setoutcolor({
            text: "#0fd149",
            back: "#2d382f"
          });
          console.log(outcolor);
        }
        else if (res.data.message === "Wrong Answer") {
          console.log("Entered Statement Wrong answer");
          setoutcolor({
            text: "#FFFFFF",
            back: "#3d2f23"
          });
          console.log(outcolor);
        }
        else {
          console.log("Entered Statement Error in code");
          setoutcolor({
            text: "#f2001c",
            back: "#3b2023"
          });
          console.log(outcolor);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="solve">
        <div>
          <small>Problem Description</small>
          <h1>{code.problem}</h1>
          <h4 style={{ color: lvlcolor }}>{code.level}</h4>
          <ul>
            {code.description.PS.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
          {code.description.Examples.map((item, index) => (
            <section>
              <h3>Example {index + 1}</h3>
              <p>
                <b>Input : </b>
                <span>{item.Input}</span>
              </p>
              <p>
                <b>Output : </b>
                <span>{item.Output}</span>
              </p>
              <p>
                <b>Explanation : </b>
                <span>{item.Explanation}</span>
              </p>
            </section>
          ))}
          <p style={{ color: outcolor.text, backgroundColor: outcolor.back , borderColor:outcolor.text}} className="result">{response.message}</p>

          {response.passed ? (
            <section className="output" style={{ backgroundColor: outcolor.back , borderColor:outcolor.text}}>
              <p style={{ color: outcolor.text }}>Time Elapsed : {response.time} ms</p>
            </section>
          ) : null}

          {!response.passed ? (
            <section className="output" style={{ backgroundColor: outcolor.back }}>
              <p>Number of Test Cases Passed : {response.test_cases_passed}</p>
              <p>Given Input : {response.given_input}</p>
              <p>Expected Output : {response.expected_output}</p>
              <p>Your Output : {response.your_output}</p>
            </section>
          ) : null}
          <p style={{ paddingBottom: "200px" }}></p>
        </div>
        <div>
          <small>Code Environment</small>
          <form>
            <textarea value={code.function} onChange={changeCode}></textarea>
          </form>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </>
  );
}
