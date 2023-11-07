import headerStyles from "./search.module.scss";
import SearchIcon from "../../assets/icon/search.svg?react"
import {useCallback, useEffect, useRef} from "react";
import {useBooksStore, useSearchText} from "../../store/index.js";
import {routes} from "../../util/constant.js";
import {useNavigate} from "react-router-dom";
import useParams from "../../hooks/useParams/index.js";

const {searchBarWrapper, searchBar, searchIcon} = headerStyles
const Search = ({immediate = true}) => {

    const {q} = useParams();

    // ON crée un ref pour lui donner le focus
    const inputRef = useRef(null)

    // on reçois le text entré à travers ce store
    const text = useSearchText("text")

    // Pour la navigation
    const navigate = useNavigate();

    // On utilise plutot le Perpage du store par ce que c'est celui
    // qui est envoyé dans l'url.
    const perPage = useBooksStore("perPage");

    useEffect(() => {
        // On restore la valeur dans le champ de recherche une seule fois
        // Apres le reload de la page
        useSearchText.set(ref => {
            ref.text = q ? q.replace(/intitle:/,"") : ""
        });
        /* On desactive eslint parce qu'on sait ce qu'on ce fait ici.
        * La donne q est parsé et affiché dans l'input au rechargement de la page.
        * On a besoin de ceci une seule fois, donc on ne passe pas de dependances
        */
        /*eslint-disable-next-line*/
    }, []);

    // On navigue vers la page de recherche quand une recherche est effectuée
    const onChange = useCallback((value, enter = false) => {

        /**
         * La propriété immediate nous dit si la recherche est effectuée
         * à chaque saisie sinon, le user clique sur l'icone de recherche ou tape
         * sur la touche entree avant que la recherche ne débute.
         *
         *
         * La propriete enter nous dit si la touche Entré est utilisée
         * */

        (immediate || enter) && value && navigate(routes.SEARCH_RESULT + `?q=intitle:${value}&startIndex=${0}&maxResults=${perPage}&printType=books`)
        useSearchText.set(ref => {
            ref.text = value
        });
        // on donne le focus après la recherche dans le header
        inputRef.current?.focus()
    }, [perPage, navigate, immediate, inputRef])

    // Pour la touche entré
    const onKeyDown = useCallback((event) => {
        !immediate && event.key === "Enter" && onChange(event.target.value, true)
    }, [onChange, immediate])

    return <div className={searchBarWrapper}>
        <input ref={inputRef} onKeyDown={onKeyDown} id={`${immediate ? "im-" : ""}search-books`} value={text}
               onChange={(e) => onChange(e.target.value)}
               className={searchBar} placeholder="Recherchez un livre"/>
        <div onClick={() => onChange(text, true)} className={searchIcon}>
            <SearchIcon width={25} height={25}/>
        </div>

    </div>
}

export default Search