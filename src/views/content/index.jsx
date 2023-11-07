import {Outlet} from "react-router-dom";
import contentStyle from "./content.module.scss";
import useParams from "../../hooks/useParams/index.js";
import BookIcon from "../../assets/icon/book.svg?react"
import Search from "../../components/search/index.jsx";

const {content} = contentStyle;

const Content = () => {

    const {paramsExist} = useParams()

    /* Si nos parametres vitaux sont present, on retourne le outlet dans lequel les resultat de recherche seront mis
    * sinon on lui demande d'effectuer une recherce
    */
    return paramsExist ? <Outlet/> : <div className={content}>
        <BookIcon height={300} width={300}/>
        <Search immediate={false}/>
    </div>
}

export default Content