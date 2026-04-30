from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_usage():
    return {'status': 'ok', 'component': 'usage'}
