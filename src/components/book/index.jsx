import {memo} from "react";
import bookStyles from "./book.module.scss";
import BookIcon from "../../assets/icon/book.svg?react"
import {getPrice} from "../../util/index.js";

const {
    bookItem, bookItemNoThumb, bookItemThumb, bookItemPriceDate, title,
    buy, authors: authorsClass, publishedDate, links, moreInfo,
    price
} = bookStyles;


/* Si buLink est present alors le livre peut etre vendu sinon, on permet juste
* de voir les infos du livres
*/
const Book = ({book}) => {

    const {volumeInfo, saleInfo} = book;

    const {imageLinks, authors} = volumeInfo;

    return <div className={bookItem}>
        {imageLinks?.thumbnail ? <img loading="lazy" className={bookItemThumb} src={imageLinks.thumbnail} alt="book"/> :
            <BookIcon className={bookItemNoThumb}/>}
        <h2 className={title}>{volumeInfo.title}</h2>
        <h2 className={authorsClass}>{authors && `Par ${authors.join(" & ")}`}</h2>
        <div className={bookItemPriceDate}>
            {!!saleInfo.buyLink && <h3 className={price}>{getPrice(saleInfo)}</h3>}
            <h4 className={publishedDate}> {volumeInfo.publishedDate}</h4>
        </div>
        <div className={links}>
            <a data-text={"Plus d'infos"} target="_blank" href={volumeInfo.infoLink} rel="noopener noreferrer"
               className={moreInfo}>{`Plus d'infos`}</a>
            {!!saleInfo.buyLink &&
                <a data-text={"Acheter"} target="_blank" href={saleInfo.buyLink} rel="noopener noreferrer"
                   className={buy}>Acheter</a>}
        </div>

    </div>
}

// On utilise memo pour optimiser un composant utilise dans une boucle
export default memo(Book)