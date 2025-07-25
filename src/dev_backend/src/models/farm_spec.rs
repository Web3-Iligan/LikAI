use candid::CandidType;
use serde::Deserialize;
use std::fmt;

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum ShrimpSpecies {
    VANNAMEI,
    MONODON,
    Others(String),
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum FarmSystem {
    INTENSIVE,
    SEMIINTENSIVE,
    EXTENSIVE,
    POLYCULTURE
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum FarmSystemUnit {
    HECTARES, 
    ACRES
}

impl fmt::Display for ShrimpSpecies {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ShrimpSpecies::VANNAMEI => write!(f, "vannamei"),
            ShrimpSpecies::MONODON => write!(f, "monodon"),
            ShrimpSpecies::Others(name) => write!(f, "{}", name)
        }
    }
}

impl fmt::Display for FarmSystem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FarmSystem::INTENSIVE => write!(f, "Intensive"),
            FarmSystem::SEMIINTENSIVE => write!(f, "Semi Intensive"),
            FarmSystem::EXTENSIVE => write!(f, "Extensive"),
            FarmSystem::POLYCULTURE => write!(f, "PolyCulture"),
        }
    }
}

impl fmt::Display for FarmSystemUnit {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FarmSystemUnit::HECTARES => write!(f, "Hectares"),
            FarmSystemUnit::ACRES => write!(f, "Acres")
        }
    }
}

#[derive(Clone, CandidType, Deserialize)]
pub struct FarmSpec {
    spec_id: String, 
    farm_id: String, 
    shrimp_species: ShrimpSpecies,
    farming_system: FarmSystem,
    farm_size: String, 
    farm_size_unit: FarmSystemUnit,
    created_at: String, 
    updated_at: String
}