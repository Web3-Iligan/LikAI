import Text "mo:base/Text";

shared (msg) persistent actor class Farmer () {

    // private values of the farmer actor. 
    private var id: Principal = msg.caller;
    private var name: ?Text = null;
    private var email: ?Text = null;
    private var phone: ?Text = null;
    private var created_at: ?Text = null;
    private var status: ?Text = null;
    private var kyc: Bool = false;

    // TODO: implement functions for storing and retrieveing updates 
    private var _updates: [(Text, Text)] = []; // for spam prevention

    // Getters
    // Accessible to Everyone.
    public func get_id(): async Principal { id; };
    public func get_name(): async ?Text { name };
    public func get_email(): async ?Text { email };
    public func get_phone(): async ?Text { phone };
    public func get_status(): async ?Text { status };
    public func creation(): async ?Text { created_at };


    // setters
    // only the owner of the class is eligible to change values.
    // This can be set by the owner only once, after the kyc verification.
    // the kyc verification is handled by the kyc canister.

    // after the kyc, the user can set only the email and phone.
    // TODO: implement cooldowns for email and phone setters.
    public func set_name(new_name: Text) { name := ?new_name; };
    public func set_email(new_email: Text) { email := ?new_email; };
    public func set_phone(new_phone: Text) { phone := ?new_phone; };
    public func set_status(new_status: Text) { status := ?new_status };
    public func set_creation(creation_time: Text) { created_at := ?creation_time };

    public func update_kyc(v: Bool) { kyc := v; };

}