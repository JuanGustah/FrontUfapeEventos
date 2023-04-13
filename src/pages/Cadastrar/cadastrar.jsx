import React from 'react';
import {Link} from 'react-router-dom'
import './cadastrar.css'

const Cadastrar = () => {
    return ( 
        <div className='container-form-cadastro'>
            <form className='form-cadastro' action="" method="post">
                <h2 className='title' >Cadastrar</h2>
                <div className='inputs-container'>
                    <input className='input-form' type="text" name="" id="" placeholder='Nome' required />
                    <input className='input-form' type="password" name="" id="" placeholder='Senha' required />
                    <input className='input-form' type="password" name="" id="" placeholder='Confirmar Senha' required />
                    <button className='button-form'>Cadastrar</button>
                </div>    

                <div className='container-opts'>
                    <p>Administrador <Link className='link' to="">Criar Conta Adm</Link> </p>
                    <p>Imprensario <Link className='link' to="">Criar Conta imprensario</Link> </p>
                </div>
            </form>
        
        </div> 
    );
}
 
export default Cadastrar;