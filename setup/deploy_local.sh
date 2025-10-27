# install mops
mops install

dfx generate

cp -r ./src/declarations/ ./frontend/src/declarations/
rm -rf src

dfx start --clean --background
dfx deploy --network local