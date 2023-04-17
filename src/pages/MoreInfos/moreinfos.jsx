import React from 'react';
import './moreinfos.css'
import { Link } from 'react-router-dom'


const MoreInfos = () => {
    return (
        <section className='moreinfos-page'>
            <div className='moreinfos-container'>
                <div className='moreinfos-card'>
                    <div className='card-image-container'>
                        
                    </div>
                    <div className='card-data-container'>
                        <h3>Administrador</h3>
                        <div className='card-data-subcontainer'>
                            Como Administrador, Você pode ser o responsavel por criar
                            um evento, também como gerencia-lo, venha fazer parte !
                        </div>
                        <div className='button-container'>
                            <Link className='button-container' to="/cadastro/adm"><button className='button-form'>Cadastrar como Adm</button></Link>   
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MoreInfos;