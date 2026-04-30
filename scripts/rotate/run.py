import sys
from datetime import datetime, timedelta
from core.provisioning.engine import ProvisioningEngine, CredentialManager, RotationEngine, RiskScoringEngine

def run_lifecycle_simulation():
    # 1. Initialize Engines
    prov = ProvisioningEngine()
    cred = CredentialManager()
    rotate = RotationEngine()
    risk = RiskScoringEngine()
    
    print("--- Service Principal Lifecycle Simulation ---")
    
    # 2. Provision Principals
    p1 = prov.create_principal("PaymentProcessor", "team-fintech", ["storage.read", "secrets.get"])
    p2 = prov.create_principal("LogCollector", "team-sre", ["logs.write", "storage.write"])
    
    print(f"Provisioned {len(prov.principals)} service principals.")
    
    # 3. Generate Credentials
    c1 = cred.generate_secret(p1['id'])
    c2 = cred.generate_secret(p2['id'], rotation_days=-1) # Simulate expired
    
    print(f"\n[CREDENTIALS] Generated credentials for {p1['name']} and {p2['name']}.")
    
    # 4. Check Rotation
    print(f"\n[ROTATION] Checking rotation requirements...")
    for pid, cdata in cred.credentials.items():
        needs_rotation = rotate.check_rotation_needed(cdata)
        status = "⚠️ ROTATION NEEDED" if needs_rotation else "✅ HEALTHY"
        print(f"  Principal ID: {pid} | Status: {status} | Expiry: {cdata['expiry']}")
        
    # 5. Risk Assessment
    print(f"\n[RISK] Performing identity risk audit...")
    for pid, pdata in prov.principals.items():
        cdata = cred.credentials[pid]
        score = risk.calculate_risk(pdata, cdata)
        print(f"  Principal: {pdata['name']} | Risk Score: {score}/100")

if __name__ == "__main__":
    run_lifecycle_simulation()
