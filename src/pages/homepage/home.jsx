import React from 'react';
import "./home.css"
import {Link} from "react-router-dom"
import Logo from "./../../images/logo.svg"

const HomePage = () => {
    //login e cadastro
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
                        <form action="" className='form-login' method='post'>
                            <input className='input-form' type="text" name="" id="" placeholder='Login'/>
                            <input className='input-form' type="password" name="" id="" placeholder='Senha'/>

                            <button className='button-form'>Entrar</button>
                        </form>
                        <span className='linha' >Não possui Conta ? <Link className='link' to="/cadastro">Criar Conta</Link></span>
                    </div>
                </div>
            </section>
        </section> 
    );
}
 
export default HomePage;