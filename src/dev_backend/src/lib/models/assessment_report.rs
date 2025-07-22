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
