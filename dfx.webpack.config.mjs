import path from 'path';
import { existsSync } from 'fs';

export async function initCanisterIds() {
    const localPath = path.resolve(process.cwd(), '.dfx', 'local', 'canister_ids.json');
    const prodPath = path.resolve(process.cwd(), 'canister_ids.json');

    let localCanisters, prodCanisters, canisters;

    try {
        if (existsSync(localPath)) {
            localCanisters = (await import(localPath, { assert: { type: 'json' } })).default;
        }
    } catch (err) {
        console.log("No local canister ids found. Continuing production");
    }
    console.log("Local canisters: ", localCanisters);

    try {
        if (existsSync(prodPath)) {
            prodCanisters = (await import(prodPath, { assert: { type: 'json' } })).default;
        }
    } catch (err) {
        console.log("No production canisters found. Continuing with local.");
    }

    const network =
        process.env.DFX_NETWORK ||
        (process.env.NODE_ENV === "production" ? "ic" : "local");

    console.info(`initCanisterIds: network=${network}`);
    console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`);

    canisters = network === "local" ? localCanisters : prodCanisters;

    console.log("Canisters: ", canisters);
    if (!canisters) {
        throw new Error("No canister configuration found for the selected network.");
    }

    for (const canister in canisters) {
        process.env[`NEXT_PUBLIC_CANISTER_ID_${canister.toUpperCase()}`] =
            canisters[canister][network];
    }
}