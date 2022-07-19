import React, { useEffect, useState, useHistory } from "react"
import { useParams } from "react-router-dom"
import fetchWithBody from "../fetch"
import { Box, Center } from "@chakra-ui/react"
import LogoLock from "../../assets/lock.png"
import LogoKey from "../../assets/key.png"
import "./style/ContentCheckor.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContentUrl() {
    let [data, setData] = useState(() => 0)
    let [password, setPassword] = useState(() => "")
    let { id } = useParams()
    const history = useHistory();

    useEffect((data) => {
        fetchWithBody("GET", `http://localhost:4000/url/check/` + id, {}, setData)
    }, [id])

    function managePassword() {
        if (!password)
            return;
        if (data) {
            fetch(`http://localhost:4000/url/check/pwsd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: id,
                    password: password
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res === 1) {
                        toast.success("Acces granted", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                            className: "toast-success"
                        })
                        localStorage.clear()
                        localStorage.setItem("credentials" , {password: password, url: id})
                    }
                    else
                        toast.error("Wrong password", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                            className: "toast-error"
                        })
                })

        }
        // toast.info("Password saved", {
        //     position: "bottom-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        // });
    }
    return (
        <>
            {data ?
                <Box className="content-all">
                    <Center className="content-img" >
                        <img src={LogoLock} alt="lock" />
                    </Center>
                    <h1 className="content-all-title"><span style={{ color: "#d9534f" }}>This url is currently protected</span> <br /> enter the url's password to acces the datas</h1>
                </Box> :
                <Box className="content-all">
                    <Center className="content-img">
                        <img src={LogoKey} alt="key" />
                    </Center>
                    <h1 className="content-all-title"><span style={{ color: "#5cb85c" }}>How nice ! </span> Nobody already claimed that url. <br /> you can make it yours by creating a password to protect it</h1>
                </Box>}
            <Center className="content-input">
                <input type={data ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={data ? "Enter the password" : "Create a password"} />
                <Box className="content-input-button" onClick={managePassword} bg={password ? "#28a4c9" : "grey"} p="0.5em">
                    Submit
                </Box>
            </Center>

            {/* {data ? <LoggingUrl existingUrl={data}/> : <CreateUrl />} */}
            <ToastContainer />
        </>
    );
}