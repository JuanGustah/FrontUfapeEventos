import React, { useState } from 'react';
import "./home.css"
import {Link} from "react-router-dom"
import Logo from "./../../images/logo.svg"
import Api from '../../api/api';
import { useNavigate } from 'react-router-dom/dist';

const HomePage = () => {
    //login e cadastro
    let [login,setLogin] = useState('');
    let [senha,setSenha] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault();

        const data={
            login,
            senha
        };

        try{
            const resposta = await Api.post('login',data);
            sessionStorage.setItem('token', resposta.data);
            console.log(resposta);
            navigate('/indexuser');

        }catch(erro){
            alert("Informações incorretas.")
        }
    }

    return ( 
        <section className='login-page'>
            <section className='container-logo'>
                <img className='logo' src={Logo} alt="" />
            </section>
            <section className='container-form'>
                <div className='subcontainer-form'>
                    <div className='tittle-container'>
                        <h1>Entrar</h1> 
                    </div>
                    <div className='container-form-geral'>
                        <form className='form-login' onSubmit={handleLogin}>
                            <input 
                                className='input-form' 
                                type="text" 
                                placeholder='Login'
                                value={login}
                                onChange={e=>setLogin(e.target.value)}
                            />
                            <input 
                                className='input-form' 
                                type="password" 
                                placeholder='Senha'
                                onChange={e=>setSenha(e.target.value)}
                            />

                            <button className='button-form' type="submit">Entrar</button>
                        </form>
                        <span className='linha' >Não possui Conta ? <Link className='link' to="/cadastro">Criar Conta</Link></span>
                    </div>
                </div>
            </section>
        </section> 
    );
}
 
export default HomePage;