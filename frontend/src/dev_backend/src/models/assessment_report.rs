/* 
    The assessment_report.rs contains the AssessmentReport struct for later use

    Note: this struct will be transferred to the Storage canister, but the models will still be used by the backend canister for type safety.
*/

use candid::{CandidType, Deserialize};


#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum ReportType {
    INITIAL,
    PROGRESS,
    FINAL
}

impl std::fmt::Display for ReportType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ReportType::INITIAL => write!(f, "Initial"),
            ReportType::PROGRESS => write!(f, "Progress"),
            ReportType::FINAL => write!(f, "Final"),
        }
    }
}
#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum ReportStatus {
    GENERATED,
    SENT,
    DOWNLOADED
}

impl std::fmt::Display for ReportStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ReportStatus::GENERATED => write!(f, "Generated"),
            ReportStatus::SENT => write!(f, "Sent"),
            ReportStatus::DOWNLOADED => write!(f, "Downloaded"),
        }
    }
}

#[derive(Clone, CandidType, Deserialize)]
pub struct AssessmentReport {
    report_id: String,
    assessment_id: String,
    report_type: ReportType, 
    report_data: String, // json::parse().unwrap()
    pdf_url: String,
    updated_at: String,
    status: ReportStatus,
}