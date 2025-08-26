import _Text "mo:base/Text";
import _Storage "canister:storage";

shared ({ caller }) persistent actor class Api() {
    // Todo: 
    // all of the verifications and middleware will be handled by the api canister, it will inter-call 
    // functions on the other canister (storage, transaction, ai)
    // For the farmer data, kyc will be implemented
    
}