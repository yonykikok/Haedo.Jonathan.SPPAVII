import React from 'react';
import Row from '../row/Row';
import "./Tabla.css";
const Tabla = ({ data, baja, setEditado }) => {
    return (
        <div className="tableContainer">
            <table >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Especialidad</th>
                        <th>Favorito</th>
                        <th>Apariciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? <tr>
                        <td colSpan="3" style={{textAlign:"center"}}>Sin Resultados</td>
                    </tr>:
                        data.map((cocinero) => <Row key={cocinero.id}
                        cocinero={cocinero}
                        handlerActualizar={setEditado}
                        handlerBaja={baja}
                    />)}
                </tbody>
            </table>
        </div>
    );
}

export default Tabla;