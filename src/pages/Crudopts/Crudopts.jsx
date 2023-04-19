import React from 'react';

import "./../../pages/index/index.css"
import { Link } from 'react-router-dom';

const CrudOps = () => {
    return (
        <section className='cruds-container' >
            <div className='crud-subcontainer'>
                <Link className='box-opt' to="/indexadm/eventos">
                    <h2>Eventos</h2>
                </Link>

                <Link className='box-opt' to="/indexadm/agenciaImprensa">
                    <h2>Agencia Imprensa</h2>
                </Link>

                <Link className='box-opt'>
                    <h2>Agencia Eventos</h2>
                </Link>

            </div>
            <div className='crud-subcontainer'>

                <Link className='box-opt'  to="/indexadm/adms">
                    <h2>Administradores</h2>
                </Link>

                <Link className='box-opt' to="/indexadm/imprensa">
                    <h2>Imprensa</h2>
                </Link>

            </div>
        </section>
    );
}

export default CrudOps;