
use std::{cell::RefCell, collections::HashMap, hash::Hash, mem};

use candid::{CandidType, Principal};
use ic_cdk::{api::call, caller, storage};
use json::JsonValue::Null;
use serde::Deserialize;

use crate::lib::models::{assessment_report::AssessmentReport, biosecurity_recommendations::BioSecurityRecommendations, farm::{Farm, FarmStatus}, farm_phase::FarmPhase, farmer::Farmer, health_finance::HealthFinance, onboarding_sessions::{self, OnboardingSession}, phase_tasks::PhaseTask, stock_access::StockAccessControl, water_management::WaterManagement};

thread_local! {
    static STATE: RefCell<State> = RefCell::default();
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

#[derive(Default, CandidType, Deserialize)]
struct State {
    total_sessions: u64,
    total_users: u64,
    farmers: HashMap<Principal, Farmer>,
    assessment_reports: HashMap<String, AssessmentReport>,
    biosecurity_assessments: HashMap<String, BioSecurityRecommendations>,
    farm_phases: HashMap<String, FarmPhase>,
    farms: HashMap<String, Farm>,
    health_finances: HashMap<String, HealthFinance>,
    onboarding_sessions: HashMap<String, OnboardingSession>,
    phase_tasks: HashMap<String, PhaseTask>,
    stock_access: HashMap<String, StockAccessControl>,
    water_management: HashMap<String, WaterManagement>
}



#[derive(CandidType, Deserialize)]
struct StableState {
    state: State,
}

#[derive(Default, CandidType, Deserialize)]
struct Response {

}

#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    let state = STATE.with(|state| mem::take(&mut *state.borrow_mut()));
    let stable_state = StableState { state };
    storage::stable_save((stable_state,)).unwrap();
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    let (StableState { state },) = storage::stable_restore().unwrap();
    STATE.with(|s| *s.borrow_mut() = state)
    STATE.with(|s| {
        let state = s.borrow_mut();
        if state.total_sessions == Null {
            state.total_sessions = 0;
        } 
        if state.total_users == Null {
            state.total_users = 0;
        }
    })
}

#[ic_cdk::query] 
pub fn login(farmer_id: String) {
    let caller_principal: Principal = caller();
    STATE.with(|s|{
        let mut state = s.borrow_mut();
        if state.onboarding_sessions.contains_key(&caller_principal.to_string()) {
            // TODO: middleware
        } else {
            
        }
    })
}



ic_cdk::export_candid!();