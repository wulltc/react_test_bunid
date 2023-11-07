import {useBooksStore} from "../../store/index.js";
import {useCallback, useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {finalizeUrl} from "../../util";


const useBookQuery = () => {

    // On récupère l'url
    const url = useLocation().search;

    /* Une référence pour ne lancer la recherche que lorsque l'utilisateur a finit de taper.
     * Ca eveite de lancer des recherches à chaque saisie
     * */
    const ref = useRef(null);

    const [results, setResults] = useState([]);

    // on memorise cette fonction pour qu'elle ne soit recrée que si l'url change
    const request = useCallback(() => {
        // on lance la recherche si l'url existe
        if (url) {
            // On annule l'ancienne recherche
            clearTimeout(ref.current);
            // On signale aux autres composants qu'une recherche va bientot commencer
            useBooksStore.set(ref => {
                ref.gettingBooks = true;
            })
            // On sauvegarde la reference de la recherche qui est effectuée
            ref.current = setTimeout(() => {
                // On lance la recherche avec l'url finalisée
                fetch(finalizeUrl(url)).then(r => r.json())
                    .then(data => {
                        /* On met a jour le store global avec
                        * le total,
                        * le nombre de page disponible = total / nombre d'element par page
                        *
                        * Et on signale que la recherche est terminé avec gettingBooks = false
                        * */
                        useBooksStore.set(ref => {
                            const total = data.totalItems;
                            ref.total = total;
                            ref.availablePages = Math.ceil(total / ref.perPage);
                            ref.gettingBooks = false;
                        })
                        // On set le resultat
                        setResults(data.items)
                    })
                // 800 ms d'attente avant de lancer la recherche
            }, 800);
        }
    }, [url])

    // on lance la recherche après que le composant concerne ne soit monté dans le dom
    useEffect(request, [request]);

    // On retourne le resultat
    return results


}

export default useBookQuery