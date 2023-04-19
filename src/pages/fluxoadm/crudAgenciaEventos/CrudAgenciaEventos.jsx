import React, { useEffect } from 'react';
import './../crudpadrao.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoAddCircle, IoCreateSharp } from 'react-icons/io5'
import Api from '../../../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Alert from '../../../components/alert/Alert';
import decoder from '../../../services/decoder';

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

const CrudAgenciaEventos = (props) => {

    const [agenciasEventos,setAgenciasEventos] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let [agenciaAtual, setAgenciaAtual]=useState(undefined);
    const [informacoesUsuario,setInformacoesUsuario] = useState({});
    const navigate=useNavigate();

    useEffect(() => {
        setInformacoesUsuario(decoder(sessionStorage.getItem('token')));

        Api.get(`agenciaEventos`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(Response => {
            console.log(Response);
            setAgenciasEventos(Response.data)  
        })
    }, []);

    function openModal(agencia) {
        setAgenciaAtual(agencia);
        setIsOpen(true);
    }

    function closeModal() {
        setAgenciaAtual(undefined);
        setIsOpen(false);

        Api.delete(`agenciaEventos/${agenciaAtual}`,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .catch(e=>{
            alert("Não foi possível apagar agência.");
            return;
        })
        .then(()=>{
            Api.get("agenciaEventos",{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .catch(e=>{
                alert("Não foi possível listar agências.");
                return;
            })
            .then(Response => {
                setAgenciasEventos(Response.data)  //response.data entra na variavel de estado Dados
            })
        })
    }

    return (
        <section className='Crud-Eventos-comp'>
            <div className='Tittle-crud-eventos'>
                <div className='Tittle-crud-eventos-subcontainer'>
                    <h1>Agências de Eventos</h1>
                </div>
                <div className='Icon-criar-box' onClick={()=>{navigate('/indexadm/adicionaragenciaeventos')}}>
                    <IoAddCircle className='icon' title="Cadastrar Agência de Eventos" size={20}/>
                </div>
            </div>
            <div className='lista-box'>
                <div className='header-lista'>
                    <div className='campo-lista-header'>
                        Nome Agência 
                    </div>
                    <div className='campo-lista-header'>
                        Administradores
                    </div>
                    <div className='campo-lista-header'>
                        Ações
                    </div>
                </div>

                <div className='lista-box-subcontainer'>

                    {
                        agenciasEventos.map(element => {
                            let propriaAgencia = element.administradores.some(adm=>adm.id==informacoesUsuario.id);
                            return (
                                <React.Fragment key={element.id}>
                                    <div className='item-lista' >
                                        <div className='campo-lista'>
                                            {element.nome}
                                        </div>
                                        <div className='campo-lista'>
                                            {element.administradores.length}
                                        </div>
                                        <div className='campo-lista editar-excluir'>
                                            <AiFillEdit className='icon' onClick={()=>{navigate('editaragenciaeventos',{state:element})}}/>
                                            <AiFillDelete className='icon' onClick={()=>{openModal(element.id)}} style={propriaAgencia?{pointerEvents:'none',cursor:'not-allowed',opacity:'40%'}:{}}/>
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

export default CrudAgenciaEventos;