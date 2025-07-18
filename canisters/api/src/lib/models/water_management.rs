use candid::CandidType;
use serde::Deserialize;
use std::fmt;

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum WaterSources {
    RIVER,
    SEA, 
    WELL,
    RAIN, 
    OTHER(String)
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum PondDrying {
    ALWAYS,
    SOMETIMES,
    RARELY
}

impl fmt::Display for WaterSources {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            WaterSources::RIVER => write!(f, "River"),
            WaterSources::SEA => write!(f, "Sea"),
            WaterSources::WELL => write!(f, "Well"),
            WaterSources::RAIN => write!(f, "Rain"),
            WaterSources::OTHER(name) => write!(f, "{}", name)
        }
    }
}

impl fmt::Display for PondDrying {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            PondDrying::ALWAYS => write!(f, "Always"),
            PondDrying::SOMETIMES => write!(f, "Sometimes"),
            PondDrying::RARELY => write!(f, "Rarely"),
        }
    }
}


#[derive(Clone, CandidType, Deserialize)]
pub struct WaterManagement {
    water_farm_id: String, 
    farm_id: String, 
    water_sources: WaterSources,
    pond_drying: PondDrying,
    created_at: String, 
    updated_at: String
}
