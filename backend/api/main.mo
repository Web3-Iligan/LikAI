import Principal "mo:base/Principal";

shared (msg) persistent actor class Api() {
    public func whoami(): async Principal {
        return msg.caller;
    }
}