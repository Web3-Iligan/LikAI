import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export type FarmStatus = { INACTIVE: null } | { ACTIVE: null };
export interface _SERVICE {
  login: ActorMethod<[Principal], string>;
  register: ActorMethod<[Principal, FarmStatus], undefined>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
