import pagingStyle from "../paging.module.scss";
import {addClasses} from "../../../util/index.js";

const {pageButton, activeLink} = pagingStyle;

/* Affiche les pages statique quand le nombre total de page est inferieure
* aux page toujours visibles + 2, le 2 c'est pour la première page et la dernière page
* */
const StaticPages = ({activePage, changePage, pages}) => {

    return [...Array(pages)].map((_, index) => {
        const pageNumber = index + 1;
        return <button key={index} onClick={() => changePage(pageNumber)}
                       className={addClasses(pageButton, activePage === pageNumber && activeLink)}>{pageNumber}</button>
    })
}

export default StaticPages