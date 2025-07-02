import GlobalStyles from "./config/GlobalStyles";
import {BrowserRouter} from "react-router-dom";
import {ToastProvider} from 'react-toast-notifications';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";


import ConfigContextProvider from "./context/ConfigContext";

import Routes from "./routes/Routes";

function App() {
    return (
        <ConfigContextProvider>
            <GlobalStyles/>
            <ToastProvider>
                <Routes></Routes>
            </ToastProvider>
        </ConfigContextProvider>
    );
}

export default App;
