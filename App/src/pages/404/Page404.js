import imagen from '../../assets/images/404.png';
import ButtonBack from "../../components/button-back/ButtonBack"
import './Page404.css';
const Page404 = () => {
    return (
        <div className="divPage404Error">
            <div className="divButtonBack" >
                <ButtonBack />
            </div>
            <img src={imagen} alt="Page not found"></img>
        </div>
    );
}

export default Page404;