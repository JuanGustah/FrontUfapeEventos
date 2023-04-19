import React from 'react';
import './../crudpadrao.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoCreateSharp } from 'react-icons/io5'

const CrudAdm = (props) => {

    const RotaAdm = props.Adms

    return (
        <section className='Crud-Eventos-comp'>
            <div className='Tittle-crud-eventos'>
                <div className='Tittle-crud-eventos-subcontainer'>
                    <h1>Administradores</h1>
                </div>
                <div className='Icon-criar-box'>
                    <IoCreateSharp className='icon' />
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
                        RotaAdm.map(element => {

                            return (
                                <>
                                    <div className='item-lista' key={""}>
                                        <div className='campo-lista'>
                                            {element.nome}
                                        </div>
                                        <div className='campo-lista editar-excluir'>
                                            <AiFillEdit className='icon' />
                                            <AiFillDelete className='icon' />
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }



                </div>
            </div>
        </section>
    );
}

export default CrudAdm;