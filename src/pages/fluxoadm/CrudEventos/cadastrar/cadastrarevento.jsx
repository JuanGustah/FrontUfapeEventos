import React, { useState } from 'react';
import Api from '../../../../services/api';
import decoder from '../../../../services/decoder';

const CadastroEvento= (props) => {
    let [nome,setNome]=useState('');
    let [data,setData]=useState('');
    let [rua,setRua]=useState('');
    let [cidade,setCidade]=useState('');
    let [estado,setEstado]=useState('');
    let [cep,setCep]=useState('');
    let [pais,setPais]=useState('');
    let [qtdMaximaIngressoCliente,setQtdMaximaIngressoCliente]=useState('');
    let [precoIngressoCliente,setPrecoIngressoCliente]=useState('');
    let [qtdMaximaIngressoAdm,setQtdMaximaIngressoAdm]=useState('');
    let [precoIngressoAdm,setPrecoIngressoAdm]=useState('');
    let [qtdMaximaIngressoImprensario,setQtdMaximaIngressoImprensario]=useState('');
    let [precoIngressoImprensario,setPrecoIngressoImprensario]=useState('');

    return(
        <div className="informacoes-evento-container">
            <div className="container">
                <h2>Informações do evento</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e=>setNome(e.target.value)} disabled/>
                    </div>
                    <div className="coluna">
                        <label>Data</label>
                        <input type="text" value={data} onChange={e=>setData(e.target.value)}  disabled/>
                    </div>
                </div>
                <h4>Endereco</h4>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Rua</label>
                        <input type="text" value={rua} onChange={e=>setRua(e.target.value)}  disabled/>
                    </div>
                    <div className="coluna">
                        <label>cep</label>
                        <input type="text" value={cep} onChange={e=>setCep(e.target.value)}   disabled/>
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Cidade</label>
                        <input type="text" value={cidade} onChange={e=>setCidade(e.target.value)}   disabled/>
                    </div>
                    <div className="coluna">
                        <label>Estado</label>
                        <input type="text" value={estado} onChange={e=>setEstado(e.target.value)}   disabled/>
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Pais</label>
                        <input type="text" value={pais} onChange={e=>setPais(e.target.value)}  disabled/>
                    </div>
                    <div className="coluna">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroEvento;