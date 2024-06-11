import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [code, setcode] = useState({
    declaration : `#include<bits/stdc++.h>
    using namespace std;`,
    function : `int square(int a){
    
}
`,
    main : `int main()
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
}`
    });
  const [response, setresponse] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const changeCode = (event)=>{
    setcode((prevstate)=>({
      ...prevstate,
      function : event.target.value
    }));
    console.log(code);
  };

  const submit = (e)=>{  
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/submit/code",{
      code : code
    })
    .then(res=>{
      console.log(res.data);
      setresponse(res.data)
      console.log(response)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
      <form onSubmit={submit}>
        <textarea value={code.function} onChange={changeCode} rows="20" cols="60"></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>{response.message}</p>
      {!response.passed ? 
      <div>
        <p>{response.test_cases_passed}</p>
        <p>{response.given_input}</p>
        <p>{response.expected_output}</p>
        <p>{response.your_output}</p>  
      </div>
       : null}
    </div>
  );
}

export default App;