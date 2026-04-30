from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_principals():
    return {'principals': [{'id': 'sp-1', 'name': 'PaymentProcessor', 'owner': 'team-fintech', 'client_id': 'sp-7a2b', 'status': 'ACTIVE'}]}
@router.post('/create')
def create_principal(data: dict = Body(...)):
    return {'status': 'CREATED', 'id': 'sp-new'}
@router.post('/decommission')
def decommission_principal(data: dict = Body(...)):
    return {'status': 'DECOMMISSIONED'}
