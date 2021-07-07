import React, { useState } from 'react';
import "./InputName.css";
const InputName = ({ atributeName, atributePlaceHolder, atributeValue, handler }) => {


    const [validName, setValidName] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const validarInputName = () => {
        setTimeout(() => {
            let inputIngresado = document.forms["myForm"]["nombre"].value;
            if (
                !esCadenaVacia(inputIngresado) &&
                esUnLargoValido(inputIngresado, 3, 16) &&
                esSoloLetras(inputIngresado)
            ) {
                setMensajeError("");
                setValidName(true);
            }
        }, 300);
    }
    const esUnLargoValido = (texto, minLength, maxLength) => {
        if (texto.length <= minLength || texto.length >= maxLength) {
            setMensajeError("El nombre debe tener entre " + minLength + "-" + maxLength + " caracteres");
            setValidName(false);
            return false;
        }
        return true;
    }

    const esSoloLetras = (texto) => {
        const pattern = new RegExp('^[a-zA-z]{1,15}$');
        if (pattern.test(texto)) {
            return true;
        }
        setValidName(false);
        setMensajeError("Los nombres deben ser solo letras sin espacios ni puntos");
        return false;
    }

    const esCadenaVacia = (texto) => {
        if (texto == "") {
            setValidName(false);
            setMensajeError("Debe ingresar el nombre");
            return true;
        }
        return false;

    }

    return (
        <div className="inputNameContainer">
            { validName ? null : <label>{mensajeError}</label>}

            <input type="text"
                onChange={validarInputName()}
                name={atributeName}
                placeholder={atributePlaceHolder}
                onChange={handler}
                value={atributeValue}
            />
        </div>
    );
}

export default InputName;