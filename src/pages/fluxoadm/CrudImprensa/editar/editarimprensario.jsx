import React, { useEffect, useState } from 'react';
import Api from '../../../../services/api';

import { useLocation, useNavigate } from 'react-router-dom';

const EditarImprensario= () => {
    const {state} = useLocation();

    let [nome,setNome]=useState('');
    let [login,setLogin]=useState('');
    let [senha,setSenha]=useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        setNome(state.nome);
        setLogin(state.login);
    },[])

    async function handleEditarImprensario(evento){
        evento.preventDefault();

        let dados={
            nome,
            login,
            senha
        }

        try{
            await Api.patch(`imprensarios/${state.id}`,dados,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            alert("Imprensário atualizado com sucesso.");
            navigate("imprensa")
        }catch(e){
            alert("Não foi possível atualizar Imprensário.");
        }
    }

    return(
        <div className="cadastro-evento-container">
            <form className="container" onSubmit={handleEditarImprensario}>
                <h2>Editar Imprensário</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e=>setNome(e.target.value)}/>
                    </div>
                    <div className="coluna">
                        <label>Login</label>
                        <input type="string" value={login} onChange={e=>setLogin(e.target.value)} />
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Senha</label>
                        <input type="text" value={senha} onChange={e=>setSenha(e.target.value)}/>
                    </div>
                    <div className="coluna">
                    </div>
                </div>
            
                <div className='area-cadastro'>
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarImprensario;