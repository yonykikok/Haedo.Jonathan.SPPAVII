import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Login.css';
const URL = "http://localhost:3000/api/login/";
const config = {
    method: "",
    headers: {
        "Content-type": "application/json; charset=utf-8"
    },
    body: null
};
const formLoginInicial = { username: "", password: "", repeatPassword: "" }
const Login = ({ setMostrarFormLogin, setCurrentUser, setUserIsLogged,setLoading }) => {


    const [isLoggin, setIsLoggin] = useState(true);
    const [userForm, setUser] = useState(formLoginInicial);
    const { username, password, repeatPassword } = userForm;


    const cerrarFormLogin = (e) => {
        setMostrarFormLogin(false);
        setIsLoggin(true);
    }
    const stopPropagationEvent = (e) => {
        e.stopPropagation();

    }

    const handlerSubmitLogin = (e) => {
        setLoading(true);
        if (e) e.preventDefault();

        if (username.trim() === "") {
            toast.warning("El nombre de usuario no puede estar vacio", { position: 'bottom-center' });
            return;
        }
        if (password.length !== 6) {
            toast.warning("La contraseña debe tener 6 caracteres", { position: 'bottom-center' });
            return;
        }

        config.method = "POST";
        config.body = JSON.stringify(userForm);

        const ingresarAlSistema = async () => {
            try {
                const res = await fetch(URL, config);
                const token = await res.json();

                if (token.error) {
                    toast.warning(token.message, { position: "bottom-center" });
                    return;
                }
                localStorage.setItem("token", token);
                sessionStorage.setItem("currentUser", username);
                toast.success("Bienvenido " + username, { position: "top-center" });
                setCurrentUser(username);
                cerrarFormLogin();
                setUserIsLogged(true);
            } catch (error) {
                toast.error(error.message, { position: 'bottom-center' })
            }
            finally {
                setLoading(false);
            }
        }
        ingresarAlSistema();



    }
    const toggleForm = (e) => {
        e.preventDefault();
        setIsLoggin(!isLoggin);
    }
    const handlerSubmitRegister = (e) => {
        e.preventDefault();
        if (userForm.password !== userForm.repeatPassword) {
            toast.warning("La contraseña debe coincidir");
            return;
        } 
        if (userForm.password.length !== 6) {
            toast.warning("La contraseña debe tener 6 caracteres");
            return;
        }


        const registrarseEnElSistema = async () => {
            const config = {
                method: "POST",
                body: JSON.stringify(userForm),
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            }
            try {
                const res = await fetch('http://localhost:3000/api/users/', config);
                const data = await res.json();
                if (data.error) {
                    toast.warning("Ups, " + data.message);
                    return;
                }

                toast.success(`Gracias ${data.username} por registrarte, ya podes iniciar sesion.`);
                setIsLoggin(true);
                //iniciarle sesion con esa cuenta!

            } catch (err) {
                toast.error("ERROR al registrar, revisame VAGO!!!!");
            }


        }
        registrarseEnElSistema();
    }

    const handlerOnChange = (e) => {
        if (e.target.name === "username" && e.target.value.length >= 15) return;
        if (e.target.name === "password" && e.target.value.length > 6) return;

        setUser({ ...userForm, [e.target.name]: e.target.value });
    }




    return (
        <div className="divLoginContainer" onClick={cerrarFormLogin}>
            <form className="formLoginContainer" onClick={stopPropagationEvent} >
                <div className="divCloseContainer" onClick={cerrarFormLogin}>
                    <label>❌</label>
                </div>
                <h1>LOGIN</h1>
                <div className="divContainerInputs">
                    <input type="text"
                        name="username"
                        placeholder="Ingrese su nombre de usuario"
                        onChange={handlerOnChange}
                        value={username}
                    />
                    <input type="password"
                        name="password"
                        placeholder="Ingrese su password"
                        onChange={handlerOnChange}
                        value={password}
                    />
                    {
                        !isLoggin &&
                        <input type="password"
                            name="repeatPassword"
                            placeholder="Repita su password"
                            onChange={handlerOnChange}
                            value={repeatPassword}
                        />
                    }
                </div>
                <div className="divContainerButtons" >
                    {isLoggin ?
                        <>
                            <button className="btn primary"
                                onClick={handlerSubmitLogin}
                            >Ingresar</button>
                            <button className="btn info" onClick={toggleForm}
                            >Registrarse</button>
                        </> :
                        <>
                            <button className="btn primary" onClick={handlerSubmitRegister}
                            >Registrarse</button>
                            <button className="btn secondary" onClick={toggleForm}
                            >Cancelar</button>
                        </>
                    }
                </div>
            </form>
        </div>
    );
}

export default Login;