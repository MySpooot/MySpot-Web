import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as ReactGA from 'react-ga';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

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
    if (import.meta.env.VITE_ENV !== 'production') return;

    import.meta.env.VITE_APP_GA && ReactGA.initialize(import.meta.env.VITE_APP_GA);
    import.meta.env.VITE_APP_SENTRY_DSN &&
        Sentry.init({
            dsn: import.meta.env.VITE_APP_SENTRY_DSN,
            integrations: [new BrowserTracing()]
        });
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
