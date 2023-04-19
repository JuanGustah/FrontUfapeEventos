import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';

import logo from "../../images/logo.svg"
import Api from '../../services/api';
import decoder from '../../services/decoder';

import {FiShoppingBag} from 'react-icons/fi';

import './styles.css';

const ClienteDashboard = (props) => {
    let [nome,setNome] = useState('');
    let [eventos,setEventos] = useState([]);
    const navigate = useNavigate();
    let informacoesUsuario={};

    useEffect(()=>{
        informacoesUsuario=decoder(sessionStorage.getItem('token'));
        setNome(informacoesUsuario.name);

        Api.get('eventos',{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(eventos=>{
            setEventos(eventos.data);
        });
    },[])

    function logout(){
        sessionStorage.clear();
        navigate('/');
    }

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
                        {nome}
                    </div>
                    <div className='sair-container'>
                        <button className='sair-button' onClick={logout}>Sair</button>
                    </div>
                </div>
            </header>
            <section className='container-cliente'>
                <div className='lista-box'>
                    <div className='header-lista'>
                        <div className='campo-lista-header'>
                            Nome evento
                        </div>
                        <div className='campo-lista-header '>
                            Endereço
                        </div>
                        <div className='campo-lista-header tittle-data-spacing'>
                            Data
                        </div>
                        <div className='campo-lista-header tittle-data-spacing'>
                            Participando?
                        </div>
                        <div className='campo-lista-header'>
                            Comprar Ingresso
                        </div>
                    </div>

                    <div className='lista-box-subcontainer'>
                        {
                            eventos.map(evento=>{
                                let participando = evento.pedidos.some(pedido=>pedido.id===informacoesUsuario.id);
                                return(
                                    <div className='item-lista' key={evento.id}>
                                        <div className='campo-lista'>
                                            {evento.nome}
                                        </div>
                                        <div className='campo-lista'>
                                            {evento.endereco.rua}
                                        </div>
                                        <div className='campo-lista'>
                                            {evento.data}
                                        </div>
                                        <div className='campo-lista'>
                                            {participando?"Sim":"Não"}
                                        </div>
                                        <div className='campo-lista editar-excluir'>
                                            <button 
                                                className={`botao-invisivel ${participando?"inativo":""}`}
                                                type="button"
                                                >
                                                    <FiShoppingBag size={25}/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </section>
    );
}

export default ClienteDashboard;