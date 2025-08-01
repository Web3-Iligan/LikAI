import path from 'path';
import { existsSync, readFileSync } from 'fs';

export async function initCanisterIds() {
    const localPath = path.resolve(process.cwd(), '.dfx', 'local', 'canister_ids.json');
    const prodPath = path.resolve(process.cwd(), 'canister_ids.json');
    console.log("Local canister ids path: ", localPath);
    console.log("Production canister ids path: ", prodPath);

    let localCanisters, prodCanisters, canisters;

    try {
        if (existsSync(localPath)) {
            const localData = readFileSync(localPath, 'utf8');
            localCanisters = JSON.parse(localData);
        }
    } catch (err) {
        console.log("No local canister ids found. Continuing production");
    }
    console.log("Local canisters: ", localCanisters);

    try {
        if (existsSync(prodPath)) {
            const prodData = readFileSync(prodPath, 'utf8');
            prodCanisters = JSON.parse(prodData);
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