

// models for the storage canister and AI
// TODO: transfer these models to storage and AI canisters
// thie canister will handle the api calls

pub mod models {
    pub mod assessment_report;
    pub mod biosecurity_assessment;
    pub mod biosecurity_recommendation;
    pub mod farm_phase;
    pub mod farm_spec;
    pub mod farm;
    pub mod farmer;
    pub mod health_finance;
    pub mod onboarding_session;
    pub mod phase_task;
    pub mod stock_access_control;
    pub mod water_management;
}

// sample code for integration with the frontend 

#[ic_cdk::query]
fn whoami() -> String {
    ic_cdk::caller().to_text()
}

// will be transferred to the storage canister
#[ic_cdk::update]
fn add_farmer(name: String) -> String {
    // This is a placeholder for adding a farmer
    format!("Farmer {} added successfully!", name)
}



/*  
    TODO: 
    1. Integrate with the frontend
    2. Deploy second and third canisters (Storage and AI)
    3. Implement the necessary business logic for each model
    4. Ensure proper error handling and validation
    5. Write unit tests for each model and function
 */


ic_cdk::export_candid!();