/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_APP_KAKAO_KEY: string;
    readonly VITE_APP_GA: string;
    readonly VITE_APP_SENTRY_DSN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
