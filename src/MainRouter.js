import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./containers/layout";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/prospect" />} />
      <Route path="/prospect/*" element={<Layout />} />
    </Routes>
  );
};

export default MainRouter;
