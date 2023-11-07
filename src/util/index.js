import {API_KEY, BASE_URL, BOOK_ENDPOINT, DARK_SCHEME, IS_DARK} from "./constant.js";

// Pour ajouter plusieurs class dans le dom
export const addClasses = (...classes) => classes.join(" ").replace("false", "");

// Ajoute les clés de recherche à cette url
export const finalizeUrl = (search) => `${BASE_URL + BOOK_ENDPOINT + search}&key=${API_KEY}`;
export const LS = {
    get: (id) => {
        if (localStorage) {
            return JSON.parse(localStorage.getItem(id))
        }
    },
    set: (id, data) => {
        if (localStorage) {
            localStorage.setItem(id, JSON.stringify(data))
        }
    }
};

export const getTheme = () => {
    /* on verifie si window existe pour eviter les erreurs pour un ssr
     * car window n'existe pas coté serveur
     */
    if (window) {
        // on cherche à savoir si le theme est noir
        const isDark = window.matchMedia(DARK_SCHEME).matches;
        // on recupere la donne sauvergarde dans le localstorage
        const ls_isDark = LS.get(IS_DARK);
        // Si rien n'était dans localstorage, alors on depose la nouvelle valeur
        !ls_isDark && LS.set(IS_DARK, isDark)
        // retourne soit la valeur du localstorage , soit la nouvelle valeur
        return ls_isDark ?? isDark
    }
    // Cote serveur on retourne false.
    return false
}

export const setThemeInDom = (isDark) => {
    /* on vérifie si document existe puis on active le mode dark manuellement
    * et on met à jour isDark dans le localstorage
    *  */
    if (document) {
        document.body.setAttribute("data-dark", isDark);
        LS.set(IS_DARK, isDark)
    }
}

// Selon la nature de la vente du livre, on gère le prix
export const getPrice = (saleInfo) => saleInfo.saleability === "FREE" ? "GRATUIT" : `${saleInfo.listPrice.currencyCode} ${saleInfo.listPrice.amount}`;