import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./style/Home.css";
import { Link, useNavigate } from "react-router-dom";
import fetchWithBody from "../fetch";
import { FiArrowUpRight } from "react-icons/fi";

export default function ContentHome() {

    let [data, setData] = useState("");
    let [taken, setTaken] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (data) {
            fetchWithBody("GET", `http://localhost:4000/url/check/` + data, {}, setTaken)
        }
    }, [data])
    // handle keypress enter with navigation
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            navigate("/" + data);
        }
    }
    return (
        <main className="home-ctn">
            <Box>
                <Box mb="5em" className="home-main-txt">
                    <h1>Welcome to CTE</h1>
                    <p>The confidential and trusted environment to share any kind of information.</p>
                </Box>
                <Box className="home-txt">
                    <h2>• How to use it ?</h2>
                    <p>Write your url path to the input slot bellow, a simple status will be updated corresponding on if the page is already protected or not <br/> Like so, you juste have then to <span style={{color: "blue", fontWeight: "bold"}}>jump to the page</span> !</p>
                    <p>Over there, two options : <br/> 1. The page is <span style={{color: "#5cb85c", fontWeight: "bold"}}>open</span>: You only will be invited to create a password for it <br/>2. 
                    The page is already <span style={{color: "#d9534f", fontWeight: "bold"}}>protected</span>: You will have to enter the url's password to acces the datas on it </p>
                </Box>
                <Box className="home-launch" mt="7em">
                    <Flex className="home-launch-upper" align="center">
                        <p>Http:/cte/</p>
                        <input type="text" value={data} onChange={(e) => setData(e.target.value.trim())} onKeyUp={((e) => handleKeyPress(e))}/>
                        <Box className="home-launch-indicator" bg={!data ? "grey" : !taken ? "#5cb85c" : "#d9534f"} w="100px" h="50px" >
                            {!data ? "Empty" : !taken ? "Open" : "Protected"}
                        </Box>
                    </Flex>
                </Box>
                <Box align="center" mt="1em">
                    <Link className="home-launch-send" to={`/${data}`}>
                        Jump to the page 
                        <FiArrowUpRight className="home-launch-send-icon"/>
                    </Link>
                </Box>
            </Box>
        </main>
    );
}