import React, { useState } from 'react';
import "./InputOnlyText.css";
const InputOnlyText = ({ formName, atributeName, atributePlaceHolder, atributeValue, handler }) => {


    const [validText, setValidText] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const validarTexto = () => {
        setTimeout(() => {
            let inputIngresado = document.forms[formName][atributeName].value;
            if (
                !esCadenaVacia(inputIngresado) &&
                esUnLargoValido(inputIngresado, 1, 2000) &&
                esSoloLetras(inputIngresado)
            ) {
                setMensajeError("");
                setValidText(true);
            }
        }, 300);
    }
    const esUnLargoValido = (texto, minLength, maxLength) => {
        if (texto.length <= minLength || texto.length >= maxLength) {
            setMensajeError("El " + atributeName  + " debe tener entre " + minLength + "-" + maxLength + " caracteres");
            setValidText(false);
            return false;
        }
        return true;
    }

    const esSoloLetras = (texto) => {
        const pattern = new RegExp('^[a-zA-z ]*$');
        if (pattern.test(texto)) {
            return true;
        }
        setValidText(false);
        setMensajeError( atributeName  + " es necesario");
        return false;
    }

    const esCadenaVacia = (texto) => {
        if (texto == "") {
            setValidText(false);
            setMensajeError("Debe ingresar " +  atributeName );
            return true;
        }
        return false;

    }

    return (
        <div className="inputTextContainer">
            { validText ? null : <label>{mensajeError}</label>}

            <input type="text"
                onChange={validarTexto()}
                name={atributeName}
                placeholder={atributePlaceHolder}
                onChange={handler}
                value={atributeValue}
            />
        </div>
    );
}

export default InputOnlyText;