from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import models

SQLALCHEMY_DATABASE_URL = "sqlite:///./dlearn.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="D-Learn API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to D-Learn API"}

from pydantic import BaseModel
from typing import Optional, List
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str = "STUDENT"

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/api/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "username": db_user.username, "role": db_user.role}

@app.post("/api/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    return {"id": db_user.id, "username": db_user.username, "role": db_user.role}

@app.get("/api/booklets")
def get_booklets(db: Session = Depends(get_db)):
    return db.query(models.Booklet).all()

from pydantic import BaseModel
from typing import Optional, List

class SubmitAnswerRequest(BaseModel):
    user_id: int
    question_id: int
    submitted_answer: str
    is_correct: Optional[bool] = None
    score: int = 0

@app.get("/api/quizzes")
def get_quizzes(chapter: str = None, db: Session = Depends(get_db)):
    query = db.query(models.QuizBankQuestion)
    if chapter:
        query = query.filter(models.QuizBankQuestion.chapter == chapter)
    return query.all()

@app.post("/api/submit_answers")
def submit_answers(reqs: List[SubmitAnswerRequest], db: Session = Depends(get_db)):
    for req in reqs:
        answer = models.StudentAnswer(
            user_id=req.user_id,
            question_id=req.question_id,
            submitted_answer=req.submitted_answer,
            is_correct=req.is_correct,
            score=req.score
        )
        db.add(answer)
    db.commit()
    return {"message": f"Submitted {len(reqs)} answers successfully"}

@app.get("/api/student_answers")
def get_student_answers(db: Session = Depends(get_db)):
    # Join with User and QuizBankQuestion to return details
    answers = db.query(
        models.StudentAnswer,
        models.User,
        models.QuizBankQuestion
    ).outerjoin(models.User, models.StudentAnswer.user_id == models.User.id)\
     .outerjoin(models.QuizBankQuestion, models.StudentAnswer.question_id == models.QuizBankQuestion.id)\
     .all()
    
    result = []
    for ans, user, q in answers:
        result.append({
            "id": ans.id,
            "user_id": ans.user_id,
            "username": user.username if user else "Anonymous",
            "question_id": q.id if q else None,
            "question_text_en": q.question_text_en if q else "Unknown",
            "question_text_ar": q.question_text_ar if q else "Unknown",
            "question_type": q.question_type if q else "Unknown",
            "submitted_answer": ans.submitted_answer,
            "is_correct": ans.is_correct,
            "score": ans.score,
            "created_at": ans.created_at
        })
    return result
