import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./style/Home.css";
import { Link, Navigate } from "react-router-dom";
import fetchWithBody from "../fetch";
export default function ContentHome() {

    let [data, setData] = useState("");
    let [taken, setTaken] = useState(false);

    useEffect(() => {
        if (data) {
            fetchWithBody("GET", `http://localhost:4000/url/check/` + data, {}, setTaken)
        }
    }, [data])

    const WhatIsIt = () => {
        return (
            <>

            </>
        )
    }
    return (
        <main className="home-ctn">
            <Box>
                <Box mb="5em" className="home-main-txt">
                    <h1>Welcome to CTE</h1>
                    <p>The confidential and trusted environment to share any kind of information.</p>
                </Box>
                <Box className="home-txt">
                    <h2>- How to use it ?</h2>
                    <p>Write your url path to the input slot bellow, a simple status will be updated corresponding on if the page is already protected or not <br/> Like so, you juste have then to <span style={{color: "blue", fontWeight: "bold"}}>jump to the page</span> !</p>
                    <p>Over there, two options : <br/> 1. The page is open: You only will be invited to create a password for it <br/>2. The page is already protected: You will have to enter the url's password to acces the data on it </p>
                </Box>
                <Box className="home-launch">
                    <Flex className="home-launch-upper" align="center">
                        <p>Http:/cte/</p>
                        <input type="text" value={data} onChange={(e) => setData(e.target.value.trim())} />
                        <Box className="home-launch-indicator" bg={!data ? "grey" : !taken ? "#5cb85c" : "#d9534f"} w="100px" h="50px" >
                            {!data ? "Empty" : !taken ? "Open" : "Protected"}
                        </Box>
                    </Flex>
                </Box>
                <Box align="center" mt="1em">
                    <Link className="home-launch-send" to={`/${data}`}>Jump to the page</Link>
                </Box>
                <WhatIsIt />
            </Box>
        </main>
    );
}