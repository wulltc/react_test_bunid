import MoonIcon from "../../assets/icon/moon.svg?react";
import SunIcon from "../../assets/icon/sun.svg?react";
import themeStyles from "./theme.module.scss";
import useTheme from "../../hooks/useTheme";
import Color from "../color";

const {themeIcon, wrapper} = themeStyles

const Theme = () => {

    /* Ce hook nous dit le thème est noir et blanc
    * il nous permet aussi de toggler le thème
    */
    const {isDark, toggleTheme} = useTheme();

    return <div className={wrapper}>
        <Color/>
        {isDark ? <SunIcon onClick={toggleTheme} className={themeIcon}/> :
            <MoonIcon onClick={toggleTheme} className={themeIcon}/>}
    </div>

}

export default Theme