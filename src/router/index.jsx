import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import {routes} from "../util/constant.js";
import BookSearch from "../views/bookSearch/index.jsx";
import NotFound from "../components/NotFound/index.jsx";

const {ROOT, SEARCH_RESULT} = routes;

export const router = createBrowserRouter([
    {
        path: ROOT,
        element: <App/>,
        children: [
            {
                path: SEARCH_RESULT,
                element: <BookSearch/>,
            }
        ],
        errorElement: <NotFound message="Page non retrouvé"/>
    }
]);