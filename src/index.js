import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import TechniqueStore from "./store/TechniqueStore";
import DocumentStore from "./store/DocumentStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)



root.render(
    <Context.Provider value={{
        user: new UserStore(),
        technique: new TechniqueStore(),
        document: new DocumentStore(),
    }}>
        <App/>
    </Context.Provider>,
)
;