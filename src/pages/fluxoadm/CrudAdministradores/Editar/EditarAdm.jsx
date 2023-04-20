import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../../services/api';
import decoder from '../../../../services/decoder';

const EditarAdm = () => {
    const { state } = useLocation() //id passado pela url ao clicar 

    const [nome, setNome] = useState(state.nome)
    const [login, setLogin] = useState(state.login)
    const [senha, setSenha] = useState()

    

    //agencia ops
    const [AgenciasEventos, SetAgencias] = useState([])
    const [AgenciaEvento, SetAgencia] = useState("")

    const navigate = useNavigate(); //navegação

    

    useEffect(() => {
        Api.get('agenciaEventos', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(resposta => {
            SetAgencias(resposta.data);
        })
    }, [])

    async function AtualizarAdm(Adm){
        Adm.preventDefault();

        const DadosAdm = {
            nome,
            login,
            senha
        }

        try {
            await Api.patch(`administradores/${state.id}`,DadosAdm, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })

            alert("Administrador atualizado !")
            navigate("/indexadm/adms")
        } catch (error) {
            alert("não foi possivel atualizar")
            console.log(error)
        }

    }

    return (
        <div className="cadastro-evento-container">
            <form className="container" onSubmit={AtualizarAdm}>
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
                            placeholder='Digite sua senha novamente !'
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

                                AgenciasEventos.map(Element => {
                                    return (
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

export default EditarAdm;