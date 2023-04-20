import React, { useEffect, useState } from 'react';
import './../crudpadrao.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoAddCircle } from 'react-icons/io5'
import Api from '../../../services/api';
import { useNavigate } from 'react-router-dom'
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


const CrudAdm = () => {
    const [DataAdm, SetDataAdm] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let [admAtual, setAdmAtual] = useState(undefined);

    useEffect(() => {

        Api.get("administradores", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(Response => {
            SetDataAdm(Response.data)
        })

    }, [])

    const Navigate = useNavigate()

    //Logica de apagar


    function openModal(Adm) {
        setAdmAtual(Adm);
        setIsOpen(true);
    }

    function closeModal() {
        setAdmAtual(undefined);
        setIsOpen(false);

        Api.delete(`administradores/${admAtual}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(e => {
                alert("Não foi possível apagar o Administrador.");
                return;
            })
            .then(() => {
                //atualizar lista

                Api.get("administradores", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                }).catch(e => {
                    alert("Não foi possível listar adms.");
                    return;
                })  
                .then(Response => {
                    SetDataAdm(Response.data)
                })
            })
    }

    return (
        <section className='Crud-Eventos-comp'>
            <div className='Tittle-crud-eventos'>
                <div className='Tittle-crud-eventos-subcontainer'>
                    <h1>Administradores</h1>
                </div>
                <div className='Icon-criar-box'>
                    <IoAddCircle
                        className='icon'
                        title="Criar Evento"
                        size={20}
                        onClick={() => { Navigate('/indexadm/adicionaradm') }}
                    />
                </div>
            </div>
            <div className='lista-box'>
                <div className='header-lista'>
                    <div className='campo-lista-header'>
                        Nome Administrador
                    </div>
                    <div className='campo-lista-header'>
                        edit / excluir
                    </div>
                </div>

                <div className='lista-box-subcontainer'>

                    {
                        DataAdm.map(element => {
                            return (
                                <React.Fragment key={element.id}>
                                    <div className='item-lista' key={element.id}>
                                        <div className='campo-lista'>
                                            {element.nome}
                                        </div>
                                        <div className='campo-lista editar-excluir'>
                                            <AiFillEdit className='icon' onClick={() => Navigate(`/indexadm/editaradm`, { state: element })} />
                                            <AiFillDelete className='icon' onClick={() => {openModal(element.id)}} />
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

export default CrudAdm;