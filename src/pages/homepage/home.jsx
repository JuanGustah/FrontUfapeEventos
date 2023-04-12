import React from 'react';
import "./home.css"

const HomePage = () => {
    //login e cadastro
    return ( 
        <section className='login-page'>
            <section className='container-logo'>

            </section>
            <section className='container-form'>
                <div className='subcontainer-form'>
                    <div className='tittle-container'>
                        <h1>Entrar</h1> 
                    </div>
                    <div className='container-form-geral'>
                        <form action="" className='form-login'>
                            <input className='input-form' type="text" name="" id="" placeholder='Login'/>
                            <input className='input-form' type="password" name="" id="" placeholder='Senha'/>

                            <button>Entrar</button>
                        </form>
                    </div>
                </div>
            </section>
        </section> 
    );
}
 
export default HomePage;