import React from "react";
import {
  BrowserRouter as Switch,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import NotFound from "../component/Notfound";
import Home from "../component/container/HomeContainer";

import Navbar from "../component/container/ContainerNavbar";
import CredCheckor from "../component/container/ContainerCheckor";
export default function Router() {
  return (
    <Switch>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CredCheckor />} />
        {/* 404 Not Found page */}
        <Route element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="" element={<NotFound />} />
      </Routes>
    </Switch>
  );
}
