import {useSearchParams} from "react-router-dom";

const useParams = () => {

    // on récupère les params dans l'url et une méthode pour les mettre à jour
    const [searchParams, setSearchParams] = useSearchParams();

    // On check si nos paramètres vitaux existent
    const paramsExist = searchParams.has("startIndex")
        && searchParams.has("maxResults")
        && searchParams.has("q");

    // On récupère le nombre maximal de résultat par page
    const perPage = searchParams.get("maxResults");

    // On récupère le début des données par page
    const startIndex = searchParams.get("startIndex");

    // On récupère le query q
    const q = searchParams.get("q");

    // on détermine la page qui sera actif
    const activePage = paramsExist ? startIndex < 10 ? 1 : (+startIndex / +perPage) + 1 : 1;

    // on retourne nos données
    return {
        activePage,
        selected: activePage,
        paramsExist,
        setSearchParams,
        q
    }
}

export default useParams