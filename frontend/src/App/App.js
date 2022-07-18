import React, { useEffect, useState } from "react"
import Router from "./Router"
import { ChakraProvider } from '@chakra-ui/react'

export default function App() {

  return (
    <>
      <ChakraProvider>
      <Router />
      </ChakraProvider>
    </>
  );
}