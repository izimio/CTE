import React, {useEffect, useState} from "react"

export default function Uri() {
  let [data, setData] = useState(() => 0)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/url/`
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