from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/rotate')
def rotate_credentials(data: dict = Body(...)):
    return {'status': 'ROTATED', 'new_version': 2}
