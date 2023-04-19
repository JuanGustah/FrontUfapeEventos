import React from 'react';
import "./index.css"
import logo from "./../../images/logo.svg"
import { useParams } from 'react-router-dom'
import CrudEventos from '../fluxoadm/CrudEventos/crudeventos';
import CrudOps from '../Crudopts/Crudopts';
import CrudImprensa from '../fluxoadm/CrudImprensa/crudimprensa';
import CrudAdm from '../fluxoadm/CrudAdministradores/crudadm';
import CrudAgenciaImprensa from '../fluxoadm/CrudAgenciaImprensa/CrudAgenciaImprensa';



const IndexAdm = (props) => {

    const {crudOpt} = useParams() 

    function RenderComp (){
        if (crudOpt === undefined){
            return <CrudOps />
        } else if (crudOpt === "eventos"){
            return <CrudEventos eventos={props.eventos}/>
        } else if (crudOpt === "imprensa"){
            return <CrudImprensa imprensa={props.Imprensa} />
        } else if (crudOpt === "adms"){
            return <CrudAdm Adms={props.Adms} /> 
        }else if (crudOpt === "agenciaImprensa"){
            return <CrudAgenciaImprensa AgenciaImprensa={props.AgenciaImprensa} /> 
        }
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
                        Bem vindo, [User]
                    </div>
                    <div className='sair-container'>
                        <button className='sair-button'>Sair</button>
                    </div>
                </div>
            </header>
            {RenderComp()}
        </section>
    );
}

export default IndexAdm;