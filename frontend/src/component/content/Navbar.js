import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/logo.png";
import "./style/Navbar.css";
import { Link } from "react-router-dom";
export default function ContentNavbar() {
    return (
        <>
            <nav>
                <Box p='6' className="nav-container" rounded='md' md="1" pl="3em" pr="3em" pt="1em">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box w="30%">
                            <Link to="/"><img src={Logo} alt="logo" /></Link>
                        </Box>
                        <Box w="70%" border className="nav-txt">
                            <Flex w="100%" justifyContent="end" alignItems="center">
                                <Link to="/" className="link li-nav">Home</Link>
                                <Link to="/about" className="link li-nav">About</Link>
                                <Link to="/contact" className="link li-nav">Contact</Link>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </nav>
        </>
    );
}