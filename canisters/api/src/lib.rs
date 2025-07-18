use std::{cell::RefCell, string};
use std::mem;
use ic_cdk::{storage, pre_upgrade, post_upgrade, caller, api};

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
        pub mod water_management;
    }
}


