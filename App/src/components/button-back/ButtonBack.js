import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonBack.css'
const ButtonBack = () => {
    return (
        <Link className="button is-info" to="/">
            Volver
        </Link>
       
    );
}

export default ButtonBack;