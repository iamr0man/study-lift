/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_BASE_URL: string;
  readonly API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
