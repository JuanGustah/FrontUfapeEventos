import React from 'react';
import Api from '../../../../services/api';
import decoder from '../../../../services/decoder';

import './styles.css';

const InformacoesEvento= (props) => {
    const DetalhesEvento = props.evento;
    const fecharModalCallback = props.fecharModalCallback;
    console.log(fecharModalCallback);
    async function comprarIngresso(){
        let idUsuario = decoder(sessionStorage.getItem('token')).id;

        let data={
            dataEmissao:new Date().toLocaleDateString(),
            preco:DetalhesEvento.ingressoCliente.preco
        }
        try{
            let resposta = Api.post(`pedidos/${DetalhesEvento.id}/${idUsuario}`,data,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            console.log(resposta);
            fecharModalCallback();
            alert("Ingresso Comprado com sucesso");
        }catch(erro){
            alert("Não foi possível comprar esse ingresso.")
        }
        
    }

    return(
        <div className="informacoes-evento-container">
            <div className="container">
                <h2>Informações do evento</h2>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Nome</label>
                        <input type="text" value={DetalhesEvento?.nome} disabled/>
                    </div>
                    <div className="coluna">
                        <label>Data</label>
                        <input type="text" value={DetalhesEvento?.data} disabled/>
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Preco</label>
                        <input type="text" value={DetalhesEvento?.ingressoCliente?.preco} disabled/>
                    </div>
                    <div className="coluna">
                    </div>
                </div>
                <h4>Endereco</h4>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Rua</label>
                        <input type="text" value={DetalhesEvento?.endereco?.rua} disabled/>
                    </div>
                    <div className="coluna">
                        <label>cep</label>
                        <input type="text" value={DetalhesEvento?.endereco?.cep}  disabled/>
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Cidade</label>
                        <input type="text" value={DetalhesEvento?.endereco?.cidade}  disabled/>
                    </div>
                    <div className="coluna">
                        <label>Estado</label>
                        <input type="text" value={DetalhesEvento?.endereco?.estado}  disabled/>
                    </div>
                </div>
                <div className="evento-linha">
                    <div className="coluna">
                        <label>Pais</label>
                        <input type="text" value={DetalhesEvento?.endereco?.pais}  disabled/>
                    </div>
                    <div className="coluna">
                    </div>
                </div>
                <h4>Atividades</h4>
                {
                    DetalhesEvento?.atividades.map((atividade)=>{
                        return (
                            <React.Fragment key={atividade?.id}>
                                <div className="evento-linha">
                                    <div className="coluna">
                                        <label>Local de Referência</label>
                                        <input type="text" value={atividade?.localReferencia} disabled/>
                                    </div>
                                    <div className="coluna">
                                        <label>Assunto</label>
                                        <input type="text" value={atividade?.assunto} disabled/>
                                    </div>
                                </div>
                                <div className="evento-linha">
                                    <div className="coluna">
                                        <label>Previsao de início</label>
                                        <input type="text" value={atividade?.horaInicio} disabled/>
                                    </div>
                                    <div className="coluna">
                                        <label>Previsao de fim</label>
                                        <input type="text" value={atividade?.horaFim} disabled/>
                                    </div>
                                </div>
                                <div className="evento-linha">
                                    <div className="coluna">
                                        <label>Atração</label>
                                        <input type="text" value={atividade?.atracao} disabled/>
                                    </div>
                                    <div className="coluna">
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }

                <div className='area-compra'>
                    <button onClick={comprarIngresso} type="button">Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default InformacoesEvento;