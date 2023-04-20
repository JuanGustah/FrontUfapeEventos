import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';

import logo from "../../images/logo.svg"
import Api from '../../services/api';
import decoder from '../../services/decoder';

import {FiShoppingBag} from 'react-icons/fi';
import ReactModal from 'react-modal';

import InformacoesEvento from '../fluxoadm/CrudEventos/informacoes/informacaoevento';

import './styles.css';

const customStyles = {
    overlay:{
        background:"#0000009c"
    },
    content: {
        right:"20%",
        left:"20%"
    },
  };

const ImprensarioDashboard = (props) => {
    let [nome,setNome] = useState('');
    let [eventos,setEventos] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [eventoAtual,setEventoAtual]= useState(undefined);
    const [informacoesUsuario,setInformacoesUsuario] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        setInformacoesUsuario(decoder(sessionStorage.getItem('token')));
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

    function openModal(evento) {
        setEventoAtual(evento);
        setIsOpen(true);
    }

    function closeModal() {
        setEventoAtual(undefined);
        setIsOpen(false);

        setInformacoesUsuario(decoder(sessionStorage.getItem('token')));
        setNome(informacoesUsuario.name);

        Api.get('eventos',{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(eventos=>{
            setEventos(eventos.data);
        });
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
                            Evento
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
                            eventos.map((evento,index)=>{
                                let participando = evento.pedidos.find(pedido=>pedido.usuario.id==informacoesUsuario.id);
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
                                                onClick={(()=>{openModal(index)})}
                                                disabled={participando}
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
            <ReactModal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            >
                <InformacoesEvento evento={eventos[eventoAtual]} fecharModalCallback={closeModal}/>
            </ReactModal>
        </section>
    );
}

export default ImprensarioDashboard;