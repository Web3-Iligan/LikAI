
use std::{cell::RefCell, collections::HashMap, hash::Hash};

use candid::{CandidType, Principal};
use serde::Deserialize;

use crate::lib::models::{assessment_report::AssessmentReport, biosecurity_recommendations::BioSecurityRecommendations, farm::FarmStatus, farmer::Farmer};

thread_local! {
    static STATE: RefCell<State> = RefCell::default();
}


#[derive(Default, CandidType, Deserialize)]
struct State {
    total_users: u64,
    farmers: HashMap<Principal, Farmer>,
    assessment_reports: HashMap<String, AssessmentReport>,
    biosecurity_assessments: HashMap<String, BioSecurityRecommendations>
}

pub mod lib {
    pub mod models {
        pub mod assessment_report;
        pub mod biosecurity_assessment;
        pub mod biosecurity_recommendations;
        pub mod farm_phase;
        pub mod farm_spec;
        pub mod farm;
        pub mod farmer;
        pub mod health_finance;
        pub mod phase_tasks;
        pub mod stock_access;
        pub mod onboarding_sessions;
        pub mod water_management;
    }
}


#[ic_cdk::query]
pub fn login(principal: Principal) -> String {
    return "Hello World".to_string();
}

#[ic_cdk::update]
pub fn register(principal: Principal, status: FarmStatus) {
    
}

#[ic_cdk::query]
pub fn get_documents(principal: Principal) {

}



ic_cdk::export_candid!();