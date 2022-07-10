import React from "react";
import {
    BrowserRouter as Switch,
    Routes,
    Route,
    // Link
} from "react-router-dom";
import Uri from "../component/test"
import NotFound from "../component/Notfound"
import ContentUrl from "../component/content"
export default function Router() {
    return (
        <Switch>
            <Routes>
                <Route path="/about" element={<Uri />} />
                <Route path="/users" />
                <Route path="/" element={<Uri />} />
                <Route path="/:id" element={<ContentUrl />} />
            {/* 404 Not Found page */}
            <Route element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
            <Route path='' element={<NotFound />} />
            </Routes>
        </Switch>
    );
}