import React, { useState, useEffect, useContext } from 'react';
import { BsPersonPlus, BsPencil } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { toast } from 'react-toastify';
import "./Formulario.css";

const formInicial = {
    id: null,
    nombre: "",
    especialidad: "",
    edad: 18,
    cantCapitulos: 1,
    favorito: false
}

const Formulario = ({ alta, modificar, editado, setEditado }) => {


    const [form, setForm] = useState(formInicial);

    const { nombre, especialidad, edad, favorito, cantCapitulos } = form;

    useEffect(() => {
        if (editado) {
            setForm(editado);
        } else {
            setForm(formInicial);
        }

    }, [editado]);//cada ves que cambie esta variable se ejecuta

    const handlerChange = (e) => {

        if (e.target.name === "nombre" && e.target.value.length >= 25) return;
        if (e.target.name === "especialidad" && e.target.value.length >= 35) return;
        if (e.target.name === "edad" && Number(e.target.value) > 65) return;
        if (e.target.name === "edad" && (e.target.value.length === 2) && Number(e.target.value) < 18) return;
        if (e.target.name === "cantCapitulos" && (Number(e.target.value) < 1 || Number(e.target.value) > 100)) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        const pattern = new RegExp('^[A-Z]+$', 'i');
        if (!pattern.test(nombre)) {
            toast.warning("El nombre solo puede contener letras")
            return;
        }

        if (nombre.trim() === "" ||
            especialidad.trim() === "") {
            toast.warning("nombre o especialidad incompletos");
            return;
        }

        if (edad < 18 || edad > 65) {
            toast.warning("La edad permitida es entre 18 y 65 años");
            return;
        }
        if (cantCapitulos < 1 || cantCapitulos > 100) {
            toast.warning("La cantidad de aparicion en capitulos es de 1 a 100");
            return;
        }

        editado ? modificar(form) : alta(form);

        handlerReset();
    }
    const handlerReset = (e) => {
        setForm(formInicial);
        setEditado(null);

    }
    const favear = (event) => {
        event.target.value === "Si"
            ? setForm({ ...form, favorito: true })
            : setForm({ ...form, favorito: false });
    }


    return (
        <div className="formularioContainer">
            <form name="myForm" onSubmit={handlerSubmit}>
                <input type="text"
                    name="nombre"
                    placeholder="Ingrese nombre"
                    onChange={handlerChange}
                    value={nombre} />

                <input type="text"
                    name="especialidad"
                    placeholder="Ingrese especialidad"
                    onChange={handlerChange}
                    value={especialidad}
                />
                <input type="number"
                    min="18"
                    max="65"
                    name="edad"
                    placeholder="Ingrese edad"
                    onChange={handlerChange}
                    value={edad}
                    title="EDAD"
                />
                <input type="number"
                    min="1"
                    max="100"
                    name="cantCapitulos"
                    placeholder="Ingrese cantidad de capitulos donde aparece"
                    onChange={handlerChange}
                    title="CANTIDAD DE CAPITULOS EN LOS QUE APARECE"
                    value={cantCapitulos}
                />

                {/* cantidad de capitulos  1-100 */}
                <div className="divFavorito" >
                    <label>Es favorito?</label>
                    <input type="radio" name="favorito" value="Si" checked={favorito} onChange={favear} /> Si
                    <input type="radio" name="favorito" value="No" checked={!favorito} onChange={favear} /> No
                </div>

                <div className="divBtn btn primary shadowPrimary" onClick={handlerSubmit}>
                    {editado ? <BsPencil /> : <BsPersonPlus />}
                    <input type="submit" value={editado ? "Modificar Cocinero" : "Alta Cocinero"} />
                </div>

                <div className="divBtn btn secondary shadowSecondary" onClick={handlerReset}>
                    <BiReset />
                    <input type="reset" value="Limpiar" />
                </div>

            </form>
        </div>
    );
}

export default Formulario;