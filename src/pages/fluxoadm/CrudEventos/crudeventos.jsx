import React, { useEffect, useState } from 'react';
import './../crudpadrao.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoAddCircle } from 'react-icons/io5'
import Api from '../../../services/api';
import decoder from '../../../services/decoder';
import { useNavigate } from 'react-router-dom';

const CrudEventos = (props) => {
    let [Rotaeventos,setRotaeventos]=useState([]);
    const navigate=useNavigate();

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
                                        <AiFillEdit className='icon' />
                                        <AiFillDelete className='icon' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default CrudEventos;