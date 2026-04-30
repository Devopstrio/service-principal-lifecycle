from typing import List, Dict
from datetime import datetime

class DecommissioningWorkflow:
    """Handles the secure retirement of service principals."""
    
    def decommission(self, principal_id: str):
        # 1. Revoke credentials
        # 2. Disable in Identity Provider
        # 3. Remove from RBAC
        return {"status": "DECOMMISSIONED", "id": principal_id, "timestamp": datetime.utcnow()}

class IdentityAuditEngine:
    """Immutable logging for all identity lifecycle actions."""
    
    def log_event(self, principal_id: str, action: str, performed_by: str):
        print(f"[{datetime.utcnow().isoformat()}] [AUDIT] Principal: {principal_id} | Action: {action} | By: {performed_by}")

class PolicyEvaluator:
    """Validates lifecycle actions against organizational constraints."""
    
    def validate_creation(self, name: str, permissions: List[str]) -> bool:
        # Constraint: No 'admin' permissions allowed for service principals
        if any("admin" in p.lower() for p in permissions):
            return False
        return True
