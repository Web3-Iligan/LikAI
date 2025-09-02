import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

// Manually define the interface for your API canister
export const createApiIdlFactory = (): IDL.InterfaceFactory => {
  return ({ IDL }) => {
    return IDL.Service({
      'whoami': IDL.Func([], [IDL.Principal], ['query']),
    });
  };
};

// Define TypeScript interface for the API canister
export interface ApiActor {
  whoami: () => Promise<Principal>;
}