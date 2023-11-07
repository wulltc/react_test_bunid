import PaletteIcon from "../../assets/icon/palette.svg?react";
import themeStyles from "../theme/theme.module.scss";
import {useCallback, useEffect, useRef} from "react";
import {LS} from "../../util/index.js";
import {COLOR} from "../../util/constant.js";

const {themeIcon, picker} = themeStyles
const Color = () => {

    // Une reference pour le color picker
    const ref = useRef(null)

    // Affiche le color picker
    const showPicker = useCallback(() => {
        ref.current?.click()
    }, [ref]);

    // On restaure la couleur sauvegarde dans le localstorage
    useEffect(() => {
        const color = LS.get(COLOR);
        color && onColorChange(color);
    }, []);


    const onColorChange = (value) => {
        // On met a jour les variables en fonction de la couleur choisi
        const rootVariables = document.querySelector(":root");
        rootVariables.style.setProperty('--user-color', value);
        rootVariables.style.setProperty('--user-color-soft', value + "4a");
        // on met aussi a jour le localstorage
        LS.set(COLOR, value)
    }

    return <div>
        <PaletteIcon onClick={showPicker} className={themeIcon}/>
        <input className={picker} ref={ref} type="color" name="" id="" onChange={(e) => onColorChange(e.target.value)}/>
    </div>
}

export default Color