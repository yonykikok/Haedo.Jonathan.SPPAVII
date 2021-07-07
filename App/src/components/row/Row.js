import React from 'react';
import { BsTrash, BsPencil } from "react-icons/bs";
const Row = ({ cocinero, handlerActualizar, handlerBaja }) => {
    const { id } = cocinero


    return (
        <tr>
            <td>{cocinero.nombre}</td>
            <td>{cocinero.edad}</td>
            <td>{cocinero.especialidad}</td>
            <td>{cocinero.favorito ? "SI" : "NO"}</td>
            <td>{cocinero.cantCapitulos}</td>
            <td>
                <button className="btn info shadowInfo" onClick={() => handlerActualizar(cocinero)}><BsPencil />Editar</button>
                <button className="btn danger shadowDanger" onClick={() => handlerBaja(id)}><BsTrash />Eliminar</button>
            </td>
        </tr>
    );
}

export default Row;