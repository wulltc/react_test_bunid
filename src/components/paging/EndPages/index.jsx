import pagingStyle from "../paging.module.scss";
import {addClasses} from "../../../util/index.js";

const {pageButton, activeLink} = pagingStyle;

// Affiche les dernieres pages disponibles
const EndPages = ({activePage, changePage, availablePages, visiblePages}) => {

    return [...Array(visiblePages)].map((_, index) => {
        const pageNumber = availablePages - (visiblePages - index);
        return <button key={index} onClick={() => changePage(pageNumber)}
                       className={addClasses(pageButton, activePage === pageNumber && activeLink)}>{pageNumber}</button>
    })
}

export default EndPages