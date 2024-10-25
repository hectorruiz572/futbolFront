import { BrowserRouter, Route, Routes } from "react-router-dom";
import Equipo from "../pages/Equipo";
import Jugadores from "../pages/Jugadores";
import Layout from "../Layout/Layout";

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Equipo />} />
        <Route path="/Jugadores/:nombre" element={<Jugadores />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
