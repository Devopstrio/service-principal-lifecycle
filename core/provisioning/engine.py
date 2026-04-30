import uuid
import secrets
import string
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta

class ProvisioningEngine:
    """Core engine for creating and managing service principals."""
    
    def __init__(self):
        self.principals = {}

    def create_principal(self, name: str, owner: str, permissions: List[str]) -> Dict:
        principal_id = str(uuid.uuid4())
        client_id = f"sp-{secrets.token_hex(4)}"
        
        principal = {
            "id": principal_id,
            "name": name,
            "owner": owner,
            "client_id": client_id,
            "permissions": permissions,
            "status": "ACTIVE",
            "created_at": datetime.utcnow(),
            "last_used": None
        }
        self.principals[principal_id] = principal
        return principal

class CredentialManager:
    """Simulated manager for service principal credentials (keys/secrets)."""
    
    def __init__(self):
        self.credentials = {}

    def generate_secret(self, principal_id: str, rotation_days: int = 90) -> str:
        secret = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))
        expiry = datetime.utcnow() + timedelta(days=rotation_days)
        
        self.credentials[principal_id] = {
            "secret_hash": "simulated_hash", # In production, hash this
            "expiry": expiry,
            "created_at": datetime.utcnow(),
            "version": self.credentials.get(principal_id, {}).get("version", 0) + 1
        }
        return secret

class RotationEngine:
    """Automates the rotation of service principal credentials."""
    
    def check_rotation_needed(self, credentials: Dict) -> bool:
        if datetime.utcnow() >= credentials['expiry']:
            return True
        # Proactive rotation if within 7 days of expiry
        if datetime.utcnow() >= (credentials['expiry'] - timedelta(days=7)):
            return True
        return False

class RiskScoringEngine:
    """Evaluates the risk profile of service principals."""
    
    def calculate_risk(self, principal: Dict, credentials: Dict) -> int:
        score = 0
        # 1. Over-permission risk
        if len(principal['permissions']) > 10:
            score += 40
        
        # 2. Stale credential risk
        age_days = (datetime.utcnow() - credentials['created_at']).days
        if age_days > 90:
            score += 30
        
        # 3. Usage risk (not used for 30+ days)
        if principal['last_used'] and (datetime.utcnow() - principal['last_used']).days > 30:
            score += 30
            
        return min(100, score)

if __name__ == "__main__":
    prov = ProvisioningEngine()
    cred = CredentialManager()
    risk = RiskScoringEngine()
    
    # 1. Provision Principal
    sp = prov.create_principal("PaymentProcessor", "team-fintech", ["storage.read", "secrets.get"])
    
    # 2. Generate Credentials
    secret = cred.generate_secret(sp['id'])
    
    print(f"--- Service Principal Lifecycle Intelligence ---")
    print(f"Created: {sp['name']} ({sp['client_id']})")
    
    # 3. Assess Risk
    score = risk.calculate_risk(sp, cred.credentials[sp['id']])
    print(f"Risk Score: {score}/100")
