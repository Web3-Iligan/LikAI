/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DFX_NETWORK?: string;
  readonly CANISTER_ID_INTERNET_IDENTITY?: string;
  readonly CANISTER_ID_API?: string;
  readonly VITE_AI_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend Window interface to include ENV
interface Window {
  ENV?: {
    DFX_NETWORK?: string;
    CANISTER_ID_INTERNET_IDENTITY?: string;
    CANISTER_ID_API?: string;
    AI_API_URL?: string;
  };
}

