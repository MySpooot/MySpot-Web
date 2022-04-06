import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { initialize } from 'react-ga';

import App from './App';
import { queryClient } from 'src/query';
import { version } from '../package.json';

(() => {
    if (window.Kakao?.Auth) return;

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY);
        }
    };

    document.body.appendChild(script);
})();

(() => {
    import.meta.env.VITE_APP_GA && initialize(import.meta.env.VITE_APP_GA);
})();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

console.log(`
███╗   ███╗██╗   ██╗███████╗██████╗  ██████╗ ████████╗
████╗ ████║╚██╗ ██╔╝██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝
██╔████╔██║ ╚████╔╝ ███████╗██████╔╝██║   ██║   ██║   
██║╚██╔╝██║  ╚██╔╝  ╚════██║██╔═══╝ ██║   ██║   ██║   
██║ ╚═╝ ██║   ██║   ███████║██║     ╚██████╔╝   ██║   
╚═╝     ╚═╝   ╚═╝   ╚══════╝╚═╝      ╚═════╝    ╚═╝   

version: ${version} 

`);
