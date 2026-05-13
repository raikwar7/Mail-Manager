from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.template import Template
from app.routes.user import get_db
from app.schemas.template_schemas import templateRecord

router = APIRouter(prefix="/templates", tags=["Templates"])


# ✅ CREATE
@router.post("/create_new_template")
def create_new_template(template: templateRecord, db: Session = Depends(get_db)):
    db_template = Template(
        title=template.title,
        subject=template.subject,
        body=template.body
    )

    db.add(db_template)
    db.commit()
    db.refresh(db_template)

    return db_template


# ✅ GET ALL
@router.get("/show_templates")
def get_templates(db: Session = Depends(get_db)):
    return db.query(Template).all()


# ✅ GET SINGLE
@router.get("/show_templates/{template_id}")
def get_template(template_id: int, db: Session = Depends(get_db)):
    return db.query(Template).filter(Template.id == template_id).first()


# ✅ UPDATE
@router.put("/show_templates/{template_id}")
def update_template(template_id: int, template: templateRecord, db: Session = Depends(get_db)):
    
    db_template = db.query(Template).filter(Template.id == template_id).first()

    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")

    db_template.title = template.title
    db_template.subject = template.subject
    db_template.body = template.body

    db.commit()
    db.refresh(db_template)

    return db_template


# ✅ DELETE
@router.delete("/{template_id}")
def delete_template(template_id: int, db: Session = Depends(get_db)):

    db_template = db.query(Template).filter(Template.id == template_id).first()

    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")

    db.delete(db_template)
    db.commit()

    return {"message": "Deleted successfully"}