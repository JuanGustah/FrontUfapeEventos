import React, { useEffect,useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Api from '../api/api';
import HomePage from '../pages/homepage/home';
import Cadastrar from '../pages/Cadastrar/cadastrar';


const Rotas = () => {
    //logica de implementação da api e distribuição para rotas (metodo get)

    const [Dados,setDados] = useState([]) //state para setar os dados


    useEffect(()=>{
        Api.get('Dados').then(Response =>{
            setDados(Response.data)  //response.data entra na variavel de estado Dados
        })
    },[])


    //Dados é passado como parametro para rotas (a api estará em dados)
    return (  
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />}/>
                    <Route exact path="/cadastro" element={<Cadastrar/>}/>
                </Routes>
            </Router>
        </> 
    );
}
 
export default Rotas;