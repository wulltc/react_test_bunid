import {createStore} from "aio-store/react";

export const useBooksStore = createStore({
    total: 0,
    perPage: 10,
    visiblePages: 3,
    availablePages: 0,
    gettingBooks: false,
})

export const useSearchText = createStore({
    text: ""
})