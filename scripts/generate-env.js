import path from 'path';
import fs from 'fs';

const network =
  process.env.DFX_NETWORK ||
  (process.env.NODE_ENV === "production" ? "ic" : "local");

const localPath = path.resolve(process.cwd(), '.dfx', 'local', 'canister_ids.json');
const prodPath = path.resolve(process.cwd(), 'canister_ids.json');

let canisters = null;

if (fs.existsSync(network === "local" ? localPath : prodPath)) {
  const raw = fs.readFileSync(network === "local" ? localPath : prodPath, 'utf-8');
  canisters = JSON.parse(raw);
}

if (!canisters) {
  throw new Error("No canister configuration found for the selected network.");
}

let envContent = `DFX_NETWORK=${network}\n`;

for (const canister in canisters) {
  envContent += `NEXT_PUBLIC_CANISTER_ID_${canister.toUpperCase()}=${canisters[canister][network]}\n`;
}

fs.writeFileSync('.env.local', envContent);
console.log('.env.local generated!');