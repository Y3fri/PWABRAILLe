import React from "react";
import { LoginCli, RegistroCliente, LayoutCli, Home, ValidCode, CambioContra, Emailverify,AF} from '../components';
import { Routes, Route } from "react-router-dom";
import SessionManagerCli from "../utils/SessionManagerCli";
import Expiracontra from "../utils/expiraCode";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginCli />}/>
      <Route path="/verificaEmail" element={<Emailverify />}/>
      <Route path="/validaCodigo" element={<><Expiracontra /><ValidCode /></>}/>
      <Route path="/reset-password/:token" element={<CambioContra />}/>
      <Route path="/Registro" element={<RegistroCliente />}/>
      
      <Route path="/Result" element={<LayoutCli><SessionManagerCli/><Home/></LayoutCli>} />  
      <Route path="PruebasAF" element={<LayoutCli><SessionManagerCli/><AF/></LayoutCli>} />  
    </Routes>
  );
};
