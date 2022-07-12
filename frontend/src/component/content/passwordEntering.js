import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import fetchWithBody from "../fetch"

export default function ContentUrl(props) {
    let [data, setData] = useState(() => 0)
    let [password, setPassword] = useState(() => "")
    let { id } = useParams()

    function launch_passwd_check() {
        fetchWithBody("POST", `http://localhost:4000/url/` + id, { password: password }, setData)
    }
    return (
        <>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => launch_passwd_check()}>Submit</button>
            <div>
                <textarea defaultValue={data.content}></textarea>
            </div>
        </>
    );
}