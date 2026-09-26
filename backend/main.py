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

@app.get("/api/booklets")
def get_booklets(db: Session = Depends(get_db)):
    return db.query(models.Booklet).all()

@app.get("/api/quizzes")
def get_quizzes(chapter: str = None, db: Session = Depends(get_db)):
    query = db.query(models.QuizBankQuestion)
    if chapter:
        query = query.filter(models.QuizBankQuestion.chapter == chapter)
    return query.all()
