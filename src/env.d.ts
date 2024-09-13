/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;

  readonly VITE_HUB_CONNECTION_URL: string;

  readonly VITE_WIDGET_URL: string;

  readonly VITE_FULLSTORY_ORG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
