from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, principals, credentials, usage, policy, audit
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(principals.router, prefix="/principals", tags=["principals"])
api_router.include_router(credentials.router, prefix="/credentials", tags=["credentials"])
api_router.include_router(usage.router, prefix="/usage", tags=["usage"])
api_router.include_router(policy.router, prefix="/policy", tags=["policy"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
