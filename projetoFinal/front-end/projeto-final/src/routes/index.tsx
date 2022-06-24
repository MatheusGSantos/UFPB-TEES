import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";

const RoutesIndexer: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
);

export default RoutesIndexer;
