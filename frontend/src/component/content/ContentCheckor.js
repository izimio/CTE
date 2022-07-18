import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import LoggingUrl from "./passwordEntering"
import CreateUrl from "./createUrl"
import fetchWithBody from "../fetch"

export default function ContentUrl() {
    let [data, setData] = useState(() => 0)
    let { id } = useParams()
    useEffect((data) => {
        fetchWithBody("GET", `http://localhost:4000/url/check/` + id, {}, setData)
        console.log(data)
    }, [data])

    return (
        <>
            {data ? <LoggingUrl existingUrl={data}/> : <CreateUrl />}
        </>
    );
}