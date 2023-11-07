import bookSearchStyles from "./bookSearch.module.scss";
import Book from "../../components/book";
import useBookQuery from "../../hooks/useBookQuery";
import {useBooksStore} from "../../store";
import Paging from "../../components/paging";
import LoadingBooks from "../../components/loadingBooks";
import NotFound from "../../components/NotFound";

const {bookSearchWrapper, info, books, text, line} = bookSearchStyles;
const BookSearch = () => {

    // Les résultats de la recherche
    const data = useBookQuery();

    // Nous dit une recherche est en cours
    const gettingBooks = useBooksStore("gettingBooks");
    // Le total des livres correspondant à la recherche
    const total = useBooksStore("total");

    // Pour le pluriel des noms
    const S = total > 1 ? "s" : ""

    return <div className={bookSearchWrapper}>
        <div className={info}>
            <div className={line}/>
            <h4 className={text}>{`${total} livre${S} trouvé${S}`}</h4>
            <div className={line}/>
        </div>
        <div className={books}>
            {gettingBooks ? <LoadingBooks/> : data.length > 0 ?
                data.map(book => {
                    return <Book key={book.id} book={book}/>
                }) : <NotFound message={"Aucun résultat"}/>
            }
        </div>
        {!!total && <Paging/>}
    </div>
}

export default BookSearch