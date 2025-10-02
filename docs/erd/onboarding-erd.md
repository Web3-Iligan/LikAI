# LikAI Farm Assessment System - Entity Relationship Diagram

This ERD represents the data model for the farm onboarding and assessment system based on the OnboardingPage component.

## Mermaid ERD Code

```mermaid
erDiagram

    FARMER {
        string farmer_id PK
        string name
        string email
        string phone
        datetime created_at
        datetime updated_at
        string status "active|inactive|pending"
    }

    FARM {
        string farm_id PK
        string farmer_id FK
        string farm_name
        string farm_location
        datetime created_at
        datetime updated_at
        string status "active|inactive"
    }

    FARM_SPECIFICATIONS {
        string spec_id PK
        string farm_id FK
        string shrimp_species "vannamei|monodon|other"
        string shrimp_species_other
        string farming_system "intensive|semi-intensive|extensive|polyculture"
        string farm_size
        string farm_size_unit "hectares|acres"
        datetime created_at
        datetime updated_at
    }

    WATER_MANAGEMENT {
        string water_id PK
        string farm_id FK
        string water_sources "river,sea,well,rain,other"
        string water_source_other
        string pond_drying "always|sometimes|rarely"
        datetime created_at
        datetime updated_at
    }

    STOCK_ACCESS_CONTROL {
        string stock_access_id PK
        string farm_id FK
        string shrimp_source "bfar-hatchery|local-hatchery|wild-caught|own-hatchery|other"
        string shrimp_source_other
        string farm_access "yes|partial|no"
        datetime created_at
        datetime updated_at
    }

    HEALTH_FINANCIAL_DATA {
        string health_fin_id PK
        string farm_id FK
        string disease_history "no|once-twice|several"
        string disease_description
        string budget "sufficient|moderate|limited|very-limited"
        datetime created_at
        datetime updated_at
    }

    BIOSECURITY_ASSESSMENT {
        string assessment_id PK
        string farm_id FK
        int farm_setup_score
        int pond_water_care_score
        int stock_sourcing_score
        int farm_access_score
        int disease_readiness_score
        int overall_score
        datetime assessment_date
        string status "completed|in-progress|pending"
    }

    BIOSECURITY_RECOMMENDATIONS {
        string recommendation_id PK
        string assessment_id FK
        string category "farm-setup|pond-water|stock-sourcing|farm-access|disease-readiness"
        string priority "critical|high|medium|low"
        string title
        string description
        string estimated_cost
        string timeframe
        string status "pending|in-progress|completed"
        datetime created_at
    }

    FARM_PHASES {
        string phase_id PK
        string farm_id FK
        int phase_number
        string phase_name
        string phase_description
        string phase_color
        string status "not-started|in-progress|completed"
        int progress_percentage
        datetime started_at
        datetime completed_at
    }

    PHASE_TASKS {
        string task_id PK
        string phase_id FK
        string recommendation_id FK
        string title
        string description
        string category
        string priority "critical|high|medium|low"
        string status "pending|in-progress|completed"
        string estimated_cost
        string timeframe
        string adaptation_reason
        datetime created_at
        datetime updated_at
    }

    ASSESSMENT_REPORTS {
        string report_id PK
        string assessment_id FK
        string report_type "initial|progress|final"
        json report_data
        string pdf_url
        datetime generated_at
        string status "generated|sent|downloaded"
    }

    ONBOARDING_SESSIONS {
        string session_id PK
        string farmer_id FK
        int current_step
        json form_data
        string session_status "in-progress|completed|abandoned"
        datetime started_at
        datetime completed_at
        datetime last_activity
    }

    %% Relationships
    FARMER ||--o{ FARM : owns
    FARMER ||--o{ ONBOARDING_SESSIONS : has

    FARM ||--|| FARM_SPECIFICATIONS : has
    FARM ||--|| WATER_MANAGEMENT : has
    FARM ||--|| STOCK_ACCESS_CONTROL : has
    FARM ||--|| HEALTH_FINANCIAL_DATA : has
    FARM ||--o{ BIOSECURITY_ASSESSMENT : undergoes
    FARM ||--o{ FARM_PHASES : contains

    BIOSECURITY_ASSESSMENT ||--o{ BIOSECURITY_RECOMMENDATIONS : generates
    BIOSECURITY_ASSESSMENT ||--o{ ASSESSMENT_REPORTS : produces

    FARM_PHASES ||--o{ PHASE_TASKS : contains
    BIOSECURITY_RECOMMENDATIONS ||--o{ PHASE_TASKS : creates
```

## Entity Descriptions

### Core Entities

1. **FARMER**: The main user/owner of the farm
2. **FARM**: The physical farm location and basic information
3. **FARM_SPECIFICATIONS**: Technical details about farming operations
4. **WATER_MANAGEMENT**: Water sources and pond management practices
5. **STOCK_ACCESS_CONTROL**: Shrimp sourcing and farm security measures
6. **HEALTH_FINANCIAL_DATA**: Disease history and financial capacity

### Assessment & Planning Entities

7. **BIOSECURITY_ASSESSMENT**: Calculated scores across 5 key areas
8. **BIOSECURITY_RECOMMENDATIONS**: Generated improvement suggestions
9. **FARM_PHASES**: Journey-based implementation phases
10. **PHASE_TASKS**: Individual actionable tasks within phases
11. **ASSESSMENT_REPORTS**: Generated PDF reports and analytics
12. **ONBOARDING_SESSIONS**: Session management for multi-step form

## Key Data Flow

1. **Onboarding**: FARMER → ONBOARDING_SESSIONS → FARM creation
2. **Assessment**: FARM data → BIOSECURITY_ASSESSMENT → Scoring algorithm
3. **Planning**: BIOSECURITY_RECOMMENDATIONS → FARM_PHASES → PHASE_TASKS
4. **Execution**: PHASE_TASKS progress tracking → Updated scores
5. **Reporting**: ASSESSMENT_REPORTS generation and delivery

## Scoring Algorithm Entities

The scoring system evaluates farms across 5 dimensions:

- **Farm Setup Basics** (species + system selection)
- **Pond & Water Care** (water sources + pond management)
- **Healthy Stock Sourcing** (quality of shrimp sources)
- **Farm Access Control** (biosecurity protocols)
- **Disease Readiness** (history + financial preparedness)

Each area is scored 0-100 based on best practice criteria defined in the `calculateBiosecurityScores()` function.
