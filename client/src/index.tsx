import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { io } from "socket.io-client";
import App from './App';
import Mediator from './services/modules/Mediator';
import UserModule from './services/modules/UserModule/UserModule';
import FileModule from './services/modules/FileModule/FileModule';
import ChatModule from './services/modules/ChatModule/ChatModule';
import Server from './services/server/Server';
import './index.scss';

const socket = io('http://localhost:3001');

const localToken = localStorage.getItem('token') || null;
const guid = localStorage.getItem('guid') || null;
const theme = localStorage.getItem('theme') || 'dark';

const mediator = new Mediator;
const server = new Server(localToken, guid, socket);

const userModule = new UserModule({ mediator, server });
const fileModule = new FileModule({ mediator, server });
const chatModule = new ChatModule({ mediator, server });

export const Modules = createContext({ userModule, fileModule, chatModule });

document.body.classList.add(theme);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Modules.Provider value={{ userModule, fileModule, chatModule }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Modules.Provider>
);