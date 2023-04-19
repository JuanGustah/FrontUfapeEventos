import React, {useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Api from '../api/api';
import HomePage from '../pages/homepage/home';
import Cadastrar from '../pages/Cadastrar/cadastrar';
import MoreInfos from '../pages/MoreInfos/moreinfos';
import IndexAdm from '../pages/index';



const Rotas = () => {
    //logica de implementação da api e distribuição para rotas (metodo get)

    const [DadosEventos, setDados] = useState([]) //state para setar os dados
    const [DadosImprensario,setImprensario] = useState([])
    const [DadosAdms,setAdms] = useState([])

    useEffect(() => {
        //Gets aqui 
        Api.get('eventos').then(Response => {
            setDados(Response.data)  //response.data entra na variavel de estado Dados
        })

        Api.get('imprensarios').then(Response => {
            setImprensario(Response.data)  //response.data entra na variavel de estado Dados
        })

        Api.get('administradores').then(Response => {
            setAdms(Response.data)  //response.data entra na variavel de estado Dados
        })
    }, [])


    //Dados é passado como parametro para rotas (a api estará em dados)
    return (
        <>
            <Router>
                <Routes>
                    { /* login log out */ }
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/cadastro" element={<Cadastrar />}>
                        <Route path=':typeUser' element={<Cadastrar />} />
                    </Route>
                    <Route exact path='/infos' element={<MoreInfos />} />

                    { /* Usuario normal */ }
                    <Route exact path='/indexuser' element={"user"} />


                    { /* Adm rotas */ }
                    <Route exact path='/indexadm' element={
                    <IndexAdm 
                        eventos={DadosEventos} 
                        Imprensa={DadosImprensario}
                        Adms={DadosAdms}
                    />}>
                        <Route exact path=':crudOpt' element={<IndexAdm />} />
                    </Route>

                </Routes>
            </Router>
        </>
    );
}

export default Rotas;