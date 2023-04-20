import React, { useEffect, useState } from 'react';
import './../crudpadrao.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { IoAddCircle } from 'react-icons/io5';
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

const CrudImprensa = (props) => {
    let [imprensario,setImprensarios]= useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let [imprensarioAtual, setImprensarioAtual]=useState(undefined);
    const navigate=useNavigate();

    useEffect(() => {
        Api.get(`imprensarios`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(Response => {
            setImprensarios(Response.data)  
        })
    }, [])

    function openModal(imprensario) {
        setImprensarioAtual(imprensario);
        setIsOpen(true);
    }

    function closeModal() {
        setImprensarioAtual(undefined);
        setIsOpen(false);

        Api.delete(`imprensarios/${imprensarioAtual}`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .catch(e=>{
            alert("Não foi possível apagar imprensário.");
            return;
        })
        .then(()=>{
            Api.get("imprensarios",{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .catch(e=>{
                alert("Não foi possível listar imprensários.");
                return;
            })
            .then(response => {
                setImprensarios(response.data);
            })
        })
    }

    return (
        <section className='Crud-Eventos-comp'>
            <div className='Tittle-crud-eventos'>
                <div className='Tittle-crud-eventos-subcontainer'>
                    <h1>Imprensários</h1>
                </div>
                <div className='Icon-criar-box' onClick={()=>{navigate('/indexadm/adicionarimprensario')}}>
                    <IoAddCircle className='icon' title="Cadastrar Imprensário" size={20}/>
                </div>
            </div>
            <div className='lista-box'>
                <div className='header-lista'>
                    <div className='campo-lista-header'>
                        Nome
                    </div>
                    <div className='campo-lista-header'>
                        Usuário
                    </div>
                    <div className='campo-lista-header'>
                        Ações
                    </div>
                </div>

                <div className='lista-box-subcontainer'>
                    {
                        imprensario.map(element => {
                            return (
                                <React.Fragment key={element.id}>
                                    <div className='item-lista'>
                                        <div className='campo-lista'>
                                            {element.nome}
                                        </div>
                                        <div className='campo-lista'>
                                            {element.login}
                                        </div>
                                        <div className='campo-lista editar-excluir'>
                                            <AiFillEdit className='icon' onClick={()=>{navigate('editarimprensario',{state:element})}}/>
                                            <AiFillDelete className='icon' onClick={()=>{openModal(element.id)}} />
                                        </div>
                                    </div>
                                </React.Fragment>
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


export default CrudImprensa;