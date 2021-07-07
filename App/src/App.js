import { useEffect, useState } from 'react';
import Tabla from './components/table/Tabla';
import Formulario from './components/form/Formulario';
import Header from './components/header/Header';
import Spinner from './components/header/Spinner';
import Login from './components/login/Login';
import { toast } from 'react-toastify';
import { handlerErrors } from './components/handlers/HandlerError';
import TokenProvider from './context/TokenContext';
const URL = "http://localhost:3000/api/cocineros";
// const defaultConfigToast = {
//   position: "top-right",
//   autoClose: 4000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };
// const URL = "https://api-rest-cocineros.herokuapp.com/api/cocineros/";
const config = {
  method: "",
  headers: {
    "Content-type": "application/json; charset=utf-8"
  },
  body: null
};


function App2() {
  const [cocineros, setCocineros] = useState([]);
  const [editado, setEditado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarFormLogin, setMostrarFormLogin] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setLoading(true);

    const getLista = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setCocineros(data);

      } catch (err) {
        console.log("ERROR en GET LISTA ", err);
      }
      finally {
        setLoading(false);
      };
    }
    getLista();

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioLogeado = sessionStorage.getItem("currentUser");
    if (token === null || usuarioLogeado === null) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('currentUser');
      setUserIsLogged(false);
      setCurrentUser("");
      return;
    }

    setUserIsLogged(true);//esta linea Chorula!!
    setCurrentUser(usuarioLogeado);


  }, []);

  const alta = (cocinero) => {
    let token = localStorage.getItem('token');
    config.method = "POST";
    config.body = JSON.stringify(cocinero);
    config.headers["Authorization"] = "bearer " + token;

    setLoading(true);
    const altaCocinero = async () => {
      try {
        const res = await fetch(URL, config);
        const data = await res.json();
        if (data.error) {
          // toast.warning(newCocinero.message + ", inicie sesion.");
          handlerErrors(data);
          relogearse();
          return;
        }
        console.log("ALTA", data);
        setCocineros([...cocineros, data])//pusheo el agregado de la api a mi lista local para no traer toda la lista.
        toast.success(`Exito! ${data.nombre} fue dado de alta`);
      } catch (error) {
        let statusText = error.statusText || "Ocurrio un error";
        toast.error(`Error:${error.status}- ${statusText}`);
      }
      finally {
        setLoading(false);
      }
    }
    altaCocinero();
  }

  const baja = (id) => {
    if (!window.confirm("Confirma eliminacion?")) return;
    config.method = "DELETE";
    let token = localStorage.getItem('token');
    config.headers["Authorization"] = "bearer " + token;
    delete config.body;
    setLoading(true);

    const bajaCocinero = async () => {
      try {
        const res = await fetch(URL + "/" + id, config);
        const data = await res.json();
        if (data.error) {//si hay error en la verificacion de token
          handlerErrors(data);
          relogearse();
          return;
        }
        //si esta todo ok
        setCocineros(cocineros.filter((cocinero) => cocinero.id !== id));
        toast.success(`El cocinero con id: '${id}' a sido borrado`);
      }
      catch (error) {
        console.error("BAJA cocinero ", error);
      }
      finally {
        setLoading(false);
      };
    }

    bajaCocinero();

  }

  const modificar = (nuevoCocinero) => {
    let token = localStorage.getItem('token');
    if (!window.confirm("Confirma modificacion?")) return;
    setLoading(true);
    let id = nuevoCocinero.id;//salvaguardamos el id del que vamos a modificar

    config.body = JSON.stringify(nuevoCocinero);
    config.headers["Authorization"] = "bearer " + token;
    config.method = "PUT";

    const actualizarCocinero = async () => {
      try {
        const res = await fetch(URL + "/" + id, config);
        const data = await res.json();
        if (data.error) {
          // toast.warning("Error: " + data.error + " message: " + data.message);
          handlerErrors(data);
          relogearse();
          return;
        }

        setCocineros(cocineros.map((cocinero) => {
          if (cocinero.id === id) {
            cocinero = nuevoCocinero;
            cocinero.id = id;
            toast.success("Cocinero modificado con exito!");
          }
          return cocinero;
        }));

      } catch (error) {
        toast.error("Error: Modificacion cocinero " + error);

      } finally {
        setLoading(false);
      };
    }
    actualizarCocinero();
  }

  const relogearse = () => {
    setMostrarFormLogin(true);
    setUserIsLogged(false);
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
  }
  return (
    <TokenProvider>

      <div className="App">
        {
          mostrarFormLogin && <Login
            setCurrentUser={setCurrentUser}
            setUserIsLogged={setUserIsLogged}
            setMostrarFormLogin={setMostrarFormLogin}
            setLoading={setLoading}
          />
        }

        <Header title="Multitask"
          setMostrarFormLogin={setMostrarFormLogin}
          userIsLogged={userIsLogged}
          currentUser={currentUser}
          setUserIsLogged={setUserIsLogged}
          setLoading={setLoading}
        ></Header>
        <Formulario
          alta={alta}
          modificar={modificar}
          editado={editado}
          setEditado={setEditado}
        />
        {/* <Spinner /> */}

        {
          loading && <Spinner />
        }

        <Tabla
          data={cocineros}
          baja={baja}
          setEditado={setEditado}
        />

      </div>
    </TokenProvider>
  );
}

export default App2;
