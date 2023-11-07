import pagingStyle from "./paging.module.scss";
import {addClasses} from "../../util/index.js";
import {useCallback} from "react";
import {useBooksStore} from "../../store/index.js";
import DynamicPages from "./DynamicPages/index.jsx";
import EndPages from "./EndPages/index.jsx";
import useParams from "../../hooks/useParams/index.js";
import StaticPages from "./StaticPages/index.jsx";

const {wrapper, pageButton, activeLink, totalItems, disabled, buttonWrapper} = pagingStyle;

const Paging = () => {

    const {availablePages, visiblePages, total} = useBooksStore();

    const {activePage, selected, setSearchParams} = useParams();

    // Affiche la page 1
    const showOne = selected > (visiblePages - 2);
    // Affiche les ... à gauche
    const showPrevDot = selected > 1;
    // Quand on atteint la fin des pages
    const reachEnd = (selected + visiblePages) >= availablePages;
    // Affiche les ... à droite
    const showNextDot = (selected + (visiblePages - 1)) < availablePages - 1;
    // Affiche la dernière button
    const showLast = selected <= availablePages;
    // Bloque le button précédent
    const lockPrev = selected <= 1;
    // Bloque le button suivant
    const lockNext = selected >= availablePages;
    // Affiche des pages static quand 6+ pages
    const showStatic = availablePages <= (visiblePages + 2);

    // Si on peut paginer
    const canPaginate = availablePages > 1

    const changePage = useCallback((value, lockChange = false) => {

        /* LockChange empeche le changement de page
        *
        * setSearchParams est une fonction qui prend un callback dans lequel
        * il nous donne un Map des params de l'url actuelle.
        * On peut donc utiliser le Map pour mettre à jour une partie
        * des mots clé présents dans l'url
        * */

        /*
        * Si on est sur la page 1, startIndex = 0
        * Si on est sur la page 2, startIndex = 10
        *
        * Donc startIndex est calculé dynamiquement en fonction de la page courante.
        * Comme on ne peut pas afficher la page 0, on soustrait -1 de la page actuelle
        * avant de multiplier le résultat par le nombre maximale d'element par page
        * */

        !lockChange && setSearchParams(param => {
            param.set("startIndex", ((value - 1) * param.get("maxResults")).toString());
            return param
        })

    }, [setSearchParams])

    return canPaginate && <div className={wrapper}>

        <div className={buttonWrapper}>
            {showStatic ?
                <StaticPages activePage={activePage} changePage={changePage} pages={availablePages}/> :
                <>
                    <button onClick={() => changePage(selected - 1, lockPrev)}
                            className={addClasses(pageButton, lockPrev && disabled)}>{"<"}</button>
                    {showOne && <button onClick={() => changePage(1)} className={pageButton}>1</button>}
                    {showPrevDot && <button className={pageButton}>...</button>}

                    {reachEnd ?
                        <EndPages visiblePages={visiblePages} availablePages={availablePages} changePage={changePage}
                                  activePage={activePage}/>
                        : <DynamicPages visiblePages={visiblePages} activePage={activePage} changePage={changePage}
                                        selected={selected}/>
                    }

                    {showNextDot && <button className={pageButton}>...</button>}
                    {showLast && <button onClick={() => changePage(availablePages)}
                                         className={addClasses(pageButton, selected === availablePages && activeLink)}>{availablePages}</button>}
                    <button onClick={() => changePage(selected + 1, lockNext)}
                            className={addClasses(pageButton, lockNext && disabled)}>{">"}</button>
                </>
            }
        </div>
        <div className={totalItems}>Au total {total} Livres</div>
    </div>
}

export default Paging