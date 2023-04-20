import React, { useEffect, useState } from 'react';
//import Api from '../../../../services/api';
//import decoder from '../../../../services/decoder';

import './styles.css';
import { useNavigate } from 'react-router-dom';
import Api from '../../../../services/api';

const CadastroAdm = () => {

    const [nome, setNome] = useState("")
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")

    const [AgenciasEventos, SetAgencias] = useState([])
    const [AgenciaEvento, SetAgencia] = useState("")

    const navigate = useNavigate();

    //pegando id de agencia de eventos

    useEffect(() => {
        Api.get('agenciaEventos', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(resposta => {
            SetAgencias(resposta.data);
        })
    }, [])

    //enviando dados

    async function CriarAdm(adm) {
        adm.preventDefault();

        const DadosAdm = {
            nome,
            login,
            senha
        }
        try {
            await Api.post(`administradores/${AgenciaEvento}`,DadosAdm, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })

            alert("Administrador Cadastrado !")
            navigate("/indexadm/adms")
        } catch (error) {
            alert("não foi possivel cadastrar")
            console.log(error)
        }
    }

    
    return (
        <div className="cadastro-evento-container">
            <form className="container" onSubmit={CriarAdm}>
                <h2>Cadastrar Administrador</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </div>

                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Login</label>
                        <input
                            value={login}
                            type="text"
                            onChange={e => setLogin(e.target.value)} />
                    </div>

                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Senha</label>
                        <input
                            value={senha} 
                            type="password" 
                            onChange={e => setSenha(e.target.value)} />
                    </div>

                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Escolha Uma agencia</label>
                        <select value={AgenciaEvento} 
                        id=""
                        onChange={e => SetAgencia(e.target.value)}>
                            <option value="0">Escolha uma agencia</option>
                            {
                                AgenciasEventos.map(Element =>{
                                    return(
                                        <>  
                                            <option key={Element.id} value={Element.id}>{Element.nome}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>

                </div>

                <div className='area-cadastro'>
                    <button type="submit" >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CadastroAdm;