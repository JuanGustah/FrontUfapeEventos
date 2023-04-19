import React, { useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist';
import Api from '../../api/api';
import './cadastrar.css'

const Cadastrar = () => {
    const { typeUser } = useParams();
    const [nome,setNome] = useState('');
    const [login,setLogin] = useState('');
    const [senha,setSenha] = useState('');
    const navigate= useNavigate();

    let TipoCadastro = ''

    if (typeUser === undefined){
        TipoCadastro = ''
    } else if (typeUser === "adm"){
        TipoCadastro = 'Administrador'
    }

    async function handleRegister(evento){
        evento.preventDefault();

        let data={
            nome,
            login,
            senha
        }

        try{
            const resposta = await Api.post('clientes',data);
            sessionStorage.setItem('token', resposta.data);
            console.log(resposta);
            navigate('/indexadm');
        }catch(erro){
            console.log(erro);
            alert("Informações incorretas.")
        }
    }

    //alterar endpoint da api de acordo com "TipoCadastro" 
    return ( 
        <div className='container-form-cadastro'>
            <form className='form-cadastro' onSubmit={handleRegister}>
                <h2 className='title' >Cadastrar {TipoCadastro}</h2>
                <div className='inputs-container'>
                    <input 
                        className='input-form' 
                        type="text" 
                        placeholder='Nome' 
                        required 
                        value={nome}
                        onChange={e=>setNome(e.target.value)}
                    />
                    <input 
                        className='input-form' 
                        type="text" 
                        placeholder='Login' 
                        required 
                        value={login}
                        onChange={e=>setLogin(e.target.value)}
                    />
                    <input 
                        className='input-form' 
                        type="password" 
                        placeholder='Senha' 
                        required 
                        value={senha}
                        onChange={e=>setSenha(e.target.value)}
                    />
                    <input 
                        className='input-form' 
                        type="password" 
                        placeholder='Confirmar Senha' 
                        required 
                    />
                    <button className='button-form'>Cadastrar</button>
                </div>    

                <div className='container-opts'>
                   {typeUser === 'adm' ? " ": <p>Deseja se tornar colaborador ? <Link className='link' to="/infos">Mais informações</Link> </p>} 
                </div>
            </form>
        
        </div> 
    );
}
 
export default Cadastrar;