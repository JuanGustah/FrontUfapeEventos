import React from 'react';
import {BsX,BsFillExclamationTriangleFill} from 'react-icons/bs';
import "./styles.css";

const Alert = (props) => {
    const fecharModalCallback = props.fecharModalCallback;
    
    return(
        <div className='alert-container'>
            <div className="cancelar">
                <button className='botao-invisivel'><BsX size={30}/></button>
            </div>
            <div className="container">
                <BsFillExclamationTriangleFill size={60} color={"#e72f2f"}/>
                <h3>Deseja realmente apagar?</h3>
                <p>Essa ação não pode ser retornada.</p>
            </div>
            <button class="confirmar" onClick={fecharModalCallback}>Confirmar</button>
        </div>
    )
}
export default Alert;