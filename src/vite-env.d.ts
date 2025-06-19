/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  // Add more if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
