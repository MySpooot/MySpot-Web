import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactGA from 'react-ga';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import { version } from '../package.json';
import App from './App';
import { queryClient } from 'src/query';

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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </BrowserRouter>
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
