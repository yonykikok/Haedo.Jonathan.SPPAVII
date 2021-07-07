import React from 'react';
import logo from "../../assets/images/gato.jpg";
import { toast } from 'react-toastify';
import "./Header.css"
const Header = ({ title, setMostrarFormLogin, userIsLogged, setUserIsLogged, currentUser,setLoading }) => {

    const mostrarFormulario = () => {
        let auxCurrentUser = sessionStorage.getItem("currentUser");
        if (!auxCurrentUser)
            setMostrarFormLogin(true);
    }
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("currentUser");
        setUserIsLogged(false);
    }

    const mostrarMenuDeOpciones = () => {
        let divs = document.getElementsByClassName('oculto');
        divs[0].setAttribute("style", "visibility:visible")
        divs[1].setAttribute("style", "visibility:visible")
    }
    const ocultarMenuDeOpciones = () => {
        let divs = document.getElementsByClassName('oculto');
        divs[0].setAttribute("style", "visibility:hidden")
        divs[1].setAttribute("style", "visibility:hidden")
    }

    const verMiPassword = () => {
        setLoading(true);
        let username = { username: sessionStorage.getItem("currentUser") };
        let config = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(username)//continuar desde aca con GET lalala
        };
        const traerMiPassword = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/users/getMyPassword/", config);
                const passwordHash = await res.json();
                toast.info(`El hash no puede desencriptarse! ${passwordHash.passwordHash}`);

            } catch (err) {
                console.log("ERROR front ", err)
            }
            finally{
                setLoading(false);
            }

        }///continuar desde aca con la logica para recuperar password
        traerMiPassword();
    }

    return (
        <header className="headerContainer">
            <img src={logo} alt="logo empresa"></img>
            <h1 style={{ backgroundColor: "transparent" }}>{title}</h1>
            {
                !userIsLogged ?
                    <button className="btn success btnIngresar" onClick={mostrarFormulario} >Ingresar</button> :
                    <div className="divPanelUsuario" onMouseEnter={mostrarMenuDeOpciones} onMouseLeave={ocultarMenuDeOpciones}>
                        <label>{currentUser}</label>
                        <label className="oculto cerrarSesion" onClick={cerrarSesion}>Cerrar sesion</label>
                        <label className="oculto cambiarPassword" onClick={verMiPassword}>Mi password</label>
                    </div>
            }
        </header>
    );
}

export default Header;