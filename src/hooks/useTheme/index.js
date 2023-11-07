import {useCallback, useEffect, useState} from "react";
import {getTheme, setThemeInDom} from "../../util/index.js";
import {DARK_SCHEME} from "../../util/constant.js";


const useTheme = () => {

    // Toggle le thème
    const toggleTheme = useCallback(() => {
        setIsDark(isDark => !isDark)
    }, [])

    const [isDark, setIsDark] = useState(getTheme());

    useEffect(() => {
        // Change le thème dans le dom à chaque fois que isDark change
        setThemeInDom(isDark)
    }, [isDark]);

    useEffect(() => {
        // Change le thème si l'utilisateur le change dans son système d'exploitation
        const onThemeChange = ({matches}) => {
            setIsDark(matches);
        }
        // Ajout du listener pour ecouter le theme selon le système
        window.matchMedia(DARK_SCHEME)
            .addEventListener('change', onThemeChange);

        return () => {
            // Retrait du listener si le composant n'est plus dans le dom
            window.matchMedia(DARK_SCHEME).removeEventListener("change", onThemeChange)
        }
    }, []);

    // On retourne nos données
    return {toggleTheme, isDark};
}

export default useTheme