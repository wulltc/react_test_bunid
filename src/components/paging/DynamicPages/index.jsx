import pagingStyle from "../paging.module.scss";
import {addClasses} from "../../../util/index.js";

const {pageButton, activeLink} = pagingStyle;

// Affiche les pages toujours visible dynamiquement en incrementant le boutton clické.
const DynamicPages = ({selected,activePage, changePage, visiblePages}) => {
    return [...Array(visiblePages)].map((_, index) => {
        const pageNumber = selected + index;
        return <button key={index} onClick={() => changePage(pageNumber)}
                       className={addClasses(pageButton, activePage === pageNumber && activeLink)}>{pageNumber}</button>
    })
}

export default DynamicPages