import React, { useEffect, useState } from 'react';
import Api from '../../../../services/api';
import decoder from '../../../../services/decoder';
import Dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EditarAgenciaImprensa= () => {
    const {state} = useLocation();
    const dayjs = Dayjs;
    dayjs.extend(customParseFormat)

    let [nome,setNome]=useState('');
    let [cnpj,setCnpj]=useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        setNome(state.nome);
        setCnpj(state.cnpj);
    },[])

    async function handleEditarEvento(evento){
        evento.preventDefault();

        let dados={
            nome,
            cnpj
        }

        try{
            await Api.patch(`agenciaImprensa/${state.id}`,dados,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            alert("Agência de Imprensa atualizada com sucesso.");
            navigate("agenciaImprensa")
        }catch(e){
            alert("Não foi possível atualizar Agência.");
        }
    }

    return(
        <div className="cadastro-evento-container">
            <form className="container" onSubmit={handleEditarEvento}>
                <h2>Editar Agência Imprensa</h2>
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
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarAgenciaImprensa;