"""
Quick test script to verify logging is working
This sends a test request to the backend to see the logs
"""

import requests
import json

print("🧪 Testing Backend Logging...")
print("=" * 80)

# Test data
test_data = {
    "farmName": "Test Farm",
    "location": "Davao del Norte",
    "primarySpecies": "vannamei",
    "farmType": "semi-intensive",
    "farmSize": "3",
    "isNewFarmer": "Existing Pond",
    "waterSource": ["Groundwater/Artesian Well"],
    "initialBudget": "100k-500k",
    "hasElectricity": "Yes",
    "topConcerns": ["Disease outbreaks", "Water quality issues"],
    "hasFencing": "Partial fencing",
    "useFootbaths": "Sometimes",
    "filterIncomingWater": "Yes, always",
    "separateReservoir": "No",
    "waterMonitoringFrequency": "Daily",
    "plSource": "Certified hatchery",
    "acclimatePLs": "Yes, always",
    "quarantinePLs": "Sometimes",
    "equipmentSharing": "Disinfect before use",
    "visitorManagement": "Restricted access with protocols",
    "wasteDisposal": "Proper composting/burial",
    "controlFeeding": "Scheduled feeding with monitoring",
    "healthMonitoring": "Daily visual checks",
    "keepRecords": "Detailed records",
    "pondDrainSunDry": "Always",
    "removeMuckLayer": "Always",
    "disinfectPond": "Always"
}

print("📤 Sending test request to http://localhost:8000/process-assessment")
print("=" * 80)
print("\n>>> CHECK YOUR BACKEND TERMINAL (where you ran 'python app.py') <<<")
print(">>> You should see detailed logs appearing there NOW! <<<\n")
print("=" * 80)

try:
    response = requests.post(
        "http://localhost:8000/process-assessment",
        json=test_data,
        headers={"Content-Type": "application/json"}
    )
    
    print("\n✅ Request sent successfully!")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("\n📥 Response received:")
        print(f"Overall Score: {result.get('overallScore')}/100")
        print(f"Overall Status: {result.get('overallStatus')}")
        print(f"Number of recommendations: {len(result.get('tasks', []))}")
        print("\n✅ Backend is working and logging is active!")
        print("\n>>> Go check your BACKEND TERMINAL to see the detailed logs! <<<")
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(response.text)
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Cannot connect to backend!")
    print("Make sure the backend is running:")
    print("  1. Open a terminal")
    print("  2. cd backend/ai_service")
    print("  3. source venv/Scripts/activate")
    print("  4. python app.py")
    
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 80)


