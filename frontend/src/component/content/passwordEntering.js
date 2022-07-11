import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import LoggingUrl from "./passwordEntering"
import CreateUrl from "./createUrl"

// fetch with a body
const fetchWithBody = async (url, body, setValue) => {
    console.log(body)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        return (() => { 
            setValue("err");
        }
        )
    }
    let data = await response.json();
    setValue(data);
}

export default function ContentUrl(props) {
    let [data, setData] = useState(() => 0)
    let [password, setPassword] = useState(() => "1234d5678")


    let { id } = useParams()
    useEffect(() => {
        setData(fetchWithBody(`http://localhost:8080/url/` + id, { password: password }, setData))
    }, [password])
    return (
        <>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>siiuu</p>
            {(data.content)}
        </>
    );
}