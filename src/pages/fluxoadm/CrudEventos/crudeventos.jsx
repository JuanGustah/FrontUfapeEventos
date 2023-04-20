import React, { useEffect, useState } from 'react';
import './../crudpadrao.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoAddCircle } from 'react-icons/io5'
import Api from '../../../services/api';
import decoder from '../../../services/decoder';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Alert from '../../../components/alert/Alert';

const customStyles = {
    overlay:{
        background:"#0000009c"
    },
    content: {
        right:"30%",
        left:"30%",
        top:"20%",
        bottom:"37.8%",
        padding:"0px"
    },
};

const CrudEventos = () => {
    let [Rotaeventos,setRotaeventos]=useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let [eventoAtual, setEventoAtual]=useState(undefined);
    const navigate=useNavigate();

    function openModal(evento) {
        setEventoAtual(evento);
        setIsOpen(true);
    }

    function closeModal() {
        setEventoAtual(undefined);
        setIsOpen(false);

        let idAdm=decoder(sessionStorage.getItem('token')).id;

        Api.delete(`eventos/${eventoAtual}`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .catch(e=>{
            alert("Não foi possível apagar evento.");
            return;
        })
        .then(()=>{
            Api.get(`administradores/${idAdm}`,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .catch(e=>{
                alert("Não foi possível listar eventos.");
                return;
            })
            .then(Response => {
                setRotaeventos(Response.data.eventos)  //response.data entra na variavel de estado Dados
            })
        })
    }

    useEffect(() => {
        //Gets aqui 
        let idAdm=decoder(sessionStorage.getItem('token')).id;

        Api.get(`administradores/${idAdm}`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(Response => {
            setRotaeventos(Response.data.eventos)  //response.data entra na variavel de estado Dados
        })
    }, [])

   
    return (
        <section className='Crud-Eventos-comp'>
            <div className='Tittle-crud-eventos'>
                <h1>Eventos</h1>
                <div className='Icon-criar-box' onClick={()=>{navigate('/indexadm/adicionareventos')}}>
                    <IoAddCircle className='icon' title="Criar Evento" size={20}/>
                </div>
            </div>
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
                    <div className='campo-lista-header'>
                        Ações
                    </div>
                </div>

                <div className='lista-box-subcontainer'>
                    {
                        Rotaeventos?.map(element => {
                            return (
                                <div className='item-lista' key={element.id}>
                                    <div className='campo-lista'>
                                        {element.nome}
                                    </div>
                                    <div className='campo-lista'>
                                        {element.endereco.rua}
                                    </div>
                                    <div className='campo-lista dataspacing'>
                                        {element.data}
                                    </div>
                                    <div className='campo-lista editar-excluir'>
                                        <AiFillEdit className='icon' onClick={()=>{navigate('editarevento',{state:element})}} />
                                        <AiFillDelete onClick={()=>{openModal(element.id)}} className='icon' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <ReactModal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            >
                <Alert fecharModalCallback={closeModal}/>
            </ReactModal>
        </section>
    );
}

export default CrudEventos;