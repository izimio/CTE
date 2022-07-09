import './App.css';
import React, {useEffect, useState} from "react"

function App() {
  let [data, setData] = useState(() => 0)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/url/`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        console.log(actualData)
        setData(JSON.stringify(actualData));
      } catch(err) {
        setData("ddd");
      }
    }
    getData()
  }, [])

  return (
    <>
      <p>{data}</p>
    </>
  );
}

export default App;
