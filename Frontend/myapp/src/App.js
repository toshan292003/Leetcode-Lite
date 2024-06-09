import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [Code, setCode] = useState("#include<bits/stdc++.h>\n\nusing namespace std;\n\nvoid main(){\n\tcout<<\"Hello\";\n}");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const changeCode = (event)=>{
    setcode(event.target.value);
    console.log(code);
  };

  const submit = (e)=>{  
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/submit/code",{
      code : code
    })
    .then(res=>{
      console.log(res.data);
      setCode(res.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
      <form onSubmit={submit}>
        <textarea value={code} onChange={changeCode} rows="20" cols="60"></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>{Code}</p>
    </div>
  );
}

export default App;