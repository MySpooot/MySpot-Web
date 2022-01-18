import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';

Sentry.init({
    dsn: 'https://a78c3b37c74f4479baa508ddbeca8bae@o1106768.ingest.sentry.io/6133487',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
});

(() => {
    if (window.Kakao?.Auth) return;

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
        }
    };

    document.body.appendChild(script);
})();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
