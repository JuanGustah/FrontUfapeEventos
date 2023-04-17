import React from 'react';
import "./indexadm.css"
import logo from "./../../images/logo.svg"
import { Link } from 'react-router-dom'

const IndexAdm = () => {
    return (
        <section className='index-adm-page'>
            <header className='header-index'>
                <div className='header-logo-container'>
                    <div className='logo-header'>
                        <img className='img' src={logo} alt="" />
                    </div>
                </div>
                <div className='opts-user'>
                    <div className='name-container'>
                        Bem vindo, [User]
                    </div>
                    <div className='sair-container'>
                        <button className='sair-button'>Sair</button>
                    </div>
                </div>
            </header>
            <section className='cruds-container' >
                <div className='crud-subcontainer'>
                    <Link className='box-opt' to="/indexam/eventos">
                        <h2>Eventos</h2>
                    </Link>

                    <Link className='box-opt'>
                        <h2>Agencia Imprensa</h2>
                    </Link>

                    <Link className='box-opt'>
                        <h2>Agencia Eventos</h2>
                    </Link>

                </div>
                <div className='crud-subcontainer'>

                    <Link className='box-opt'>
                        <h2>Administradores</h2>
                    </Link>

                    <Link className='box-opt'>
                        <h2>Imprensa</h2>
                    </Link>

                </div>
            </section>
        </section>
    );
}

export default IndexAdm;