import headerStyles from "./header.module.scss";
import Search from "../search";
import Theme from "../theme";

const {header, title} = headerStyles
const Header = () => {

    return <header className={header}>
        <h1 className={title}>E-Book, E-Pub</h1>
        <Search/>
        <Theme/>
    </header>
}

export default Header