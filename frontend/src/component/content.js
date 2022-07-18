import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"

export default function ContentUrl() {
    let [data, setData] = useState(() => 0)
    let { id } = useParams()
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/url/check/` + id
                );
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                let actualData = await response.json();
                console.log(actualData)
                setData(actualData);
            } catch (err) {
                setData("err");
            }
        }
        getData()
    }, [])

    return (
        <>
            <p>{data.content}</p>
        </>
    );
}