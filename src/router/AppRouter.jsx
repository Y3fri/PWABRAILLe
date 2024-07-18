import React from "react";
import { LoginCli, LayoutCli, Home, ValidCode, CambioContra, Emailverify,AF,GL, MP,QU, VZ} from '../components';
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
      <Route path="/Result" element={<LayoutCli><SessionManagerCli/><Home/></LayoutCli>} />  
      <Route path="PruebasAF" element={<LayoutCli><SessionManagerCli/><AF/></LayoutCli>} /> 
      <Route path="PruebasGL" element={<LayoutCli><SessionManagerCli/><GL/></LayoutCli>} />
      <Route path="PruebasMP" element={<LayoutCli><SessionManagerCli/><MP/></LayoutCli>} />  
      <Route path="PruebasQU" element={<LayoutCli><SessionManagerCli/><QU/></LayoutCli>} />  
      <Route path="PruebasVZ" element={<LayoutCli><SessionManagerCli/><VZ/></LayoutCli>} />    
    </Routes>
  );
};
