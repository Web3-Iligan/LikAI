import Principal "mo:base/Principal";
module {
    
    public type Farmer = {
        principal: Principal;
        avatar: Text;
        first_name: Text;
        email: Text;
        bio: Text;
        phone: Text;
        created_at: Text;
        updated_at: Text;
        status: Text;
    };

    public type Farm = {
        farm: Principal;
        farm_id: Text;
        farm_name: Text;
        farm_location: Text;
        created_at: Text;
        updated_at: Text;
        status: Text;
    };

    public type FarmSpecifications = {
        spec_id: Text;
        farm_id: Text;
        shrimp_species: Text;
        farming_system: Text;
        farm_size: Text;
        farm_size_unit: Text;
        created_ad: Text;
        updated_at: Text;
    };

    public type WaterManagement = {
        water_id: Text;
        farm_id: Text;
        water_sources: Text; 
        pond_drying: Text;
        created_at: Text;
        updated_at: Text;
    };

    public type StockAccessControl = {
        stock_access_id: Text;
        farm_id: Text;
        shrimp_source: Text;
        farm_access: Text; 
        created_at: Text;
        updated_at: Text;
    };

    public type HealthFinancialData = {
        health_finance_id: Text;
        farm_id: Text;
        disease_history: Text;
        disease_description: Text;
        budget: Text;
        created_at: Text;
        updated_at: Text;
    };

    public type BiosecurityAssessment = {
        assessment_id: Text;
        farm_id: Text;
        farm_setup_score: Nat;
        pond_water_care_score: Nat;
        stock_sourcing_score: Nat;
        farm_access_score: Nat;
        disease_readiness_score: Nat;
        overall_score: Nat;
        assessment_date: Text;
        status: Text;
    };

    public type BiosecurityRecommendation {
        recommendation_id: Text;
        assessment_id: Text;
        category: Text;
        priority: Text;
        title: Text;
        description: Text;
        estimated_cost: Text;
        timeframe: Text;
        status: Text;
        created_at: Text;
    };

    public type FarmPhase = {
        phase_id: Text;
        farm_id: Text;
        phase_number: Nat;
        phase_name: Text;
        phase_description: Text;
        phase_color: Text;
        status: Text;
        progress_percentage: Text;
        started_at: Text;
        completed_at: Text;
    }

    public type PhaseTask = {
        task_id: Text; 
    }
}