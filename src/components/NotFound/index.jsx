import NoResultIcon from "../../assets/icon/no_result.svg?react"
import notFoundStyles from "./notFound.module.scss";

const {notFound, text} = notFoundStyles;
const NotFound = ({message}) => {
    return <div className={notFound}>
        <NoResultIcon width={100} height={100}/>
        <div className={text}>{message}</div>
    </div>
}

export default NotFound