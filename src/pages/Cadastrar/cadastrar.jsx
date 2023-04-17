import React from 'react';
import {Link, useParams} from 'react-router-dom'
import './cadastrar.css'




const Cadastrar = () => {

    const { typeUser } = useParams()

    let TipoCadastro = ''

    if (typeUser === undefined){
        TipoCadastro = ''
    } else if (typeUser === "adm"){
        TipoCadastro = 'Administrador'
    }


    //alterar endpoint da api de acordo com "TipoCadastro" 
    return ( 
        <div className='container-form-cadastro'>
            <form className='form-cadastro' action="" method="post">
                <h2 className='title' >Cadastrar {TipoCadastro}</h2>
                <div className='inputs-container'>
                    <input className='input-form' type="text" name="" id="" placeholder='Nome' required />
                    <input className='input-form' type="password" name="" id="" placeholder='Senha' required />
                    <input className='input-form' type="password" name="" id="" placeholder='Confirmar Senha' required />
                    <button className='button-form'>Cadastrar</button>
                </div>    

                <div className='container-opts'>
                   {typeUser === 'adm' ? " ": <p>Deseja se tornar colaborador ? <Link className='link' to="/infos">Mais informações</Link> </p>} 
                </div>
            </form>
        
        </div> 
    );
}
 
export default Cadastrar;