// Make environment variables available globally
interface WindowWithEnv extends Window {
  ENV?: {
    DFX_NETWORK?: string;
    CANISTER_ID_INTERNET_IDENTITY?: string;
  };
}

declare const window: WindowWithEnv;

// Initialize ENV if it doesn't exist
window.ENV = window.ENV || {};

// Try to get values from import.meta.env first (Vite) or fall back to default values
window.ENV.DFX_NETWORK = import.meta.env.DFX_NETWORK || 
                          window.ENV.DFX_NETWORK || 
                          'local';

window.ENV.CANISTER_ID_INTERNET_IDENTITY = import.meta.env.CANISTER_ID_INTERNET_IDENTITY || 
                                          window.ENV.CANISTER_ID_INTERNET_IDENTITY || 
                                          'rdmx6-jaaaa-aaaaa-aaadq-cai'; // Default local II canister

export {}; // This file is a module