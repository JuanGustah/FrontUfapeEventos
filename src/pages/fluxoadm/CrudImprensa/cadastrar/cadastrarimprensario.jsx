import React, { useState } from 'react';
import Api from '../../../../services/api';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CadastoImprensario = () => {
    let [nome,setNome]=useState('');
    let [login,setLogin]=useState('');
    let [senha,setSenha]=useState('');
    let [agenciaImprensa,setAgenciaImprensa]=useState(0);
    let [agenciasImprensa,setAgenciasImprensa]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        Api.get(`agenciaImprensa`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(resposta=>{
            setAgenciasImprensa(resposta.data);
        })
    },[])

    async function handleCriarEvento(evento){
        evento.preventDefault();

        let dados={
            nome,
            login,
            senha
        }

        try{
            await Api.post(`imprensarios/${agenciaImprensa}`,dados,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            alert("Imprensário criada com sucesso.");
            navigate('imprensa');
        }catch(e){
            alert("Não foi possível cadastrar Imprensário.");
        }
    }
    return(
        <div className="cadastro-evento-container">
            <form className="container" onSubmit={handleCriarEvento}>
                <h2>Cadastrar Imprensário</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e=>setNome(e.target.value)}/>
                    </div>
                    <div className="coluna">
                        <label>Agência de Imprensa</label>
                        <select value={agenciaImprensa} onChange={e=>setAgenciaImprensa(e.target.value)}>
                            <option value="0" disabled>Escolha uma agência</option>
                            {agenciasImprensa.map((agencia)=>{
                                return (
                                    <option key={agencia.id} value={agencia.id}>{agencia.nome}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Login</label>
                        <input type="string" value={login} onChange={e=>setLogin(e.target.value)} />
                    </div>
                    <div className="coluna">
                        <label>Senha</label>
                        <input type="string" value={senha} onChange={e=>setSenha(e.target.value)} />
                    </div>
                </div>
                <div className='area-cadastro'>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default CadastoImprensario;