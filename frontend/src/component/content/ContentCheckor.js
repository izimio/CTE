import React, { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
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
    const navigate = useNavigate();
    const [ls, setLs] = useState(() => localStorage.getItem("credentials") ? JSON.parse(localStorage.getItem("credentials")) : {})
    console.log(ls)

    console.log(ls)
    useEffect((data) => {
        fetchWithBody("GET", `http://localhost:4000/url/check/` + id, {}, setData)
    }, [id])
    // uevent listhener on enter key







    const manageLock = useCallback(() => {
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
            .catch(err => {
                toast.error(err, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    className: "toast-error"
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
                    localStorage.setItem("credentials", JSON.stringify({ password: password, url: id }))
                    navigate("/")
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
    }, [password, id, navigate])
    const manageKey = useCallback(() => {
        toast.success("Acces granted")
        return;
        fetch(`http://localhost:4000/url/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: id,
                password: password
            })
        })
            .catch(err => {
                toast.error(err, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    className: "toast-error"
                })
            })
            .then(res => res.json())
            .then(res => { })
    }, [password, id])
    // function with usecallback
    const managePassword = useCallback(() => {
        if (!password)
            return;
        if (data) {
            manageLock()

        } else {
            manageKey()
        }
            // toast.info("Password saved", {
            //     position: "bottom-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            // });
        }, [password, data, manageLock, manageKey])

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                managePassword()
            }
        })
        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    managePassword()
                }
            })
        }
    }, [managePassword])
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