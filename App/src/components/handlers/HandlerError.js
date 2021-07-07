import { toast } from 'react-toastify';

export function handlerErrors(infoError) {
    console.log(infoError.error);
    switch (infoError.error) {
        case "JsonWebTokenError":
            toast.warning("Debe iniciar sesion para esta accion.");
            break;
        case "TokenExpiredError":
            toast.warning("Token Expirado, reinicie sesion.");
            break;
    }
    console.log("ENTRA ERRORS")
}

