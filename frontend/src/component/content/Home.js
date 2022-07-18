import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./style/Home.css";
import { Link } from "react-router-dom";

export default function ContentHome() {

    let [data, setData] = useState("");

    const goToPage = (e) => {
        console.log("dd");
        window.location.href = data;
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            goToPage(e);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, [])

    return (
        <main className="home-ctn">
            <Box>
                <text className="text-home">
                    <h1>Welcome to CTE</h1>
                    <p>
                        The confidential and truster environment to share any kind of information.
                    </p>
                </text>
                <Box className="home-launch">
                    <Flex className="home-launch-upper" align="center">
                        <p>Http:/cte/</p>
                        <input type="text" onChange={(e) => setData(e.target.value)} />
                    </Flex>
                    <Link to={`/${data}`}>dddd </Link>

                </Box>
            </Box>
        </main>
    );
}