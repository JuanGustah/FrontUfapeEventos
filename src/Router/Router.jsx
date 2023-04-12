import React, { useEffect,useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import App from '../App';
import Api from '../api/api';


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
                    <Route exact path="/" element={<App />}/>
                    <Route exact path="/teste" element={"Teste de rota"}/>
                </Routes>
            </Router>
        </> 
    );
}
 
export default Rotas;