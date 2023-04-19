import React, { useEffect, useState } from 'react';
import Api from '../../../../services/api';
import decoder from '../../../../services/decoder';
import Dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EditarEvento= (props) => {
    const {state} = useLocation();
    const dayjs = Dayjs;
    dayjs.extend(customParseFormat)

    let [nome,setNome]=useState('');
    let [data,setData]=useState('');
    let [rua,setRua]=useState('');
    let [cidade,setCidade]=useState('');
    let [estado,setEstado]=useState('');
    let [cep,setCep]=useState('');
    let [pais,setPais]=useState('');
    let [qtdMaximaIngressoCliente,setQtdMaximaIngressoCliente]=useState(0);
    let [precoIngressoCliente,setPrecoIngressoCliente]=useState(0);
    let [qtdMaximaIngressoAdm,setQtdMaximaIngressoAdm]=useState(0);
    let [precoIngressoAdm,setPrecoIngressoAdm]=useState(0);
    let [qtdMaximaIngressoImprensario,setQtdMaximaIngressoImprensario]=useState(0);
    let [precoIngressoImprensario,setPrecoIngressoImprensario]=useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(state);
        console.log(state.data);
        console.log(dayjs(state.data,"DD/MM/YYYY"));
        setNome(state.nome);
        setData(state.data);    
        setRua(state.endereco.rua);
        setCep(state.endereco.cep);
        setCidade(state.endereco.cidade);
        setEstado(state.endereco.estado);
        setPais(state.endereco.pais);
        setQtdMaximaIngressoAdm(state.ingressoAdministrador.qtdMaxima)
        setPrecoIngressoAdm(state.ingressoAdministrador.preco)
        setQtdMaximaIngressoCliente(state.ingressoCliente.qtdMaxima)
        setPrecoIngressoCliente(state.ingressoCliente.preco)
        setQtdMaximaIngressoImprensario(state.ingressoImprensario.qtdMaxima)
        setPrecoIngressoImprensario(state.ingressoImprensario.preco)
    },[])

    async function handleCriarEvento(evento){
        evento.preventDefault();

        let dados={
            nome,
            data: new Date(data).toLocaleDateString(),
            endereco:{
                rua,
                cidade,
                estado,
                cep,
                pais
            },
            ingressoCliente:{
                qtdMaxima:Number(qtdMaximaIngressoCliente),
                preco:Number(precoIngressoCliente)
            },
            ingressoAdministrador:{
                qtdMaxima:Number(qtdMaximaIngressoAdm),
                preco:Number(precoIngressoAdm)
            },
            ingressoImprensario:{
                qtdMaxima:Number(qtdMaximaIngressoImprensario),
                preco:Number(precoIngressoImprensario)
            }
        }

        try{
            let idUsuario = decoder(sessionStorage.getItem('token')).id;

            let resposta = await Api.post(`eventos/${idUsuario}`,dados,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            alert("Evento criado com sucesso");
            navigate('/indexadm/eventos');
        }catch(e){
            alert("Não foi possível cadastrar evento.");
        }
    }

    return(
        <div className="cadastro-evento-container">
            <form className="container">
                <h2>Editar Novo Evento</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e=>setNome(e.target.value)}/>
                    </div>
                    <div className="coluna">
                        <label>Data</label>
                        <input type="date" value={dayjs(data,"DD/MM/YYYY").format('YYYY-MM-DD')} onChange={e=>setData(e.target.value)} />
                    </div>
                </div>
                <h4>Endereco</h4>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Rua</label>
                        <input type="text" value={rua} onChange={e=>setRua(e.target.value)} />
                    </div>
                    <div className="coluna">
                        <label>cep</label>
                        <input type="text" value={cep} onChange={e=>setCep(e.target.value)}  />
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Cidade</label>
                        <input type="text" value={cidade} onChange={e=>setCidade(e.target.value)}  />
                    </div>
                    <div className="coluna">
                        <label>Estado</label>
                        <input type="text" value={estado} onChange={e=>setEstado(e.target.value)}  />
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Pais</label>
                        <input type="text" value={pais} onChange={e=>setPais(e.target.value)} />
                    </div>
                    <div className="coluna">
                    </div>
                </div>
                <h4>Ingressos</h4>
                <h5>Administrador</h5>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Quantidade</label>
                        <input type="number" value={qtdMaximaIngressoAdm} onChange={e=>setQtdMaximaIngressoAdm(e.target.value)} />
                    </div>
                    <div className="coluna">
                        <label>Preco</label>
                        <input type="number" value={precoIngressoAdm} onChange={e=>setPrecoIngressoAdm(e.target.value)}  />
                    </div>
                </div>
                <h5>Cliente</h5>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Quantidade</label>
                        <input type="number" value={qtdMaximaIngressoCliente} onChange={e=>setQtdMaximaIngressoCliente(e.target.value)} />
                    </div>
                    <div className="coluna">
                        <label>Preco</label>
                        <input type="number" value={precoIngressoCliente} onChange={e=>setPrecoIngressoCliente(e.target.value)}  />
                    </div>
                </div>
                <h5>Imprensário</h5>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Quantidade</label>
                        <input type="number" value={qtdMaximaIngressoImprensario} onChange={e=>setQtdMaximaIngressoImprensario(e.target.value)} />
                    </div>
                    <div className="coluna">
                        <label>Preco</label>
                        <input type="number" value={precoIngressoImprensario} onChange={e=>setPrecoIngressoImprensario(e.target.value)}  />
                    </div>
                </div>

                <div className='area-cadastro'>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarEvento;