import React, { useState } from 'react';
import Api from '../../../../services/api';
import decoder from '../../../../services/decoder';

import './styles.css';
import { useNavigate } from 'react-router-dom';

const CadastoAgenciaImprensa = () => {
    let [nome,setNome]=useState('');
    let [cnpj,setCnpj]=useState('');
    const navigate = useNavigate();

    async function handleCriarEvento(evento){
        evento.preventDefault();

        let dados={
            nome,
            cnpj
        }

        try{
            await Api.post(`agenciaImprensa`,dados,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            alert("Agência criada com sucesso.");
            navigate('/indexadm/agenciaImprensa');
        }catch(e){
            alert("Não foi possível cadastrar Agência.");
        }
    }
    return(
        <div className="cadastro-evento-container">
            <form className="container" onSubmit={handleCriarEvento}>
                <h2>Cadastrar Agencia Imprensa</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e=>setNome(e.target.value)}/>
                    </div>
                    <div className="coluna">
                        <label>Cnpj</label>
                        <input type="string" value={cnpj} onChange={e=>setCnpj(e.target.value)} />
                    </div>
                </div>
                <div className='area-cadastro'>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default CadastoAgenciaImprensa;