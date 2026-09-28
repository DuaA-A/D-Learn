from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="STUDENT") # STUDENT, TEACHER
    xp_points = Column(Integer, default=0)
    quiz_bank_practice_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())

class CourseProgress(Base):
    __tablename__ = "course_progress"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    completed_lessons = Column(Integer, default=0)
    completed_quizzes = Column(Integer, default=0)
    last_accessed_lesson_id = Column(Integer)
    created_at = Column(DateTime, default=func.now())
    
class Booklet(Base):
    __tablename__ = "booklets"
    id = Column(Integer, primary_key=True, index=True)
    title_ar = Column(String, nullable=False)
    title_en = Column(String, nullable=False)
    description_ar = Column(Text)
    description_en = Column(Text)
    content_ar = Column(Text)
    content_en = Column(Text)
    chapter = Column(String)
    lesson = Column(String)
    created_at = Column(DateTime, default=func.now())

class QuizBankQuestion(Base):
    __tablename__ = "quiz_bank_questions"
    id = Column(Integer, primary_key=True, index=True)
    question_type = Column(String, nullable=False, default="MCQ") # MCQ or WRITTEN
    chapter = Column(String, nullable=False)
    lesson = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    question_text_ar = Column(Text, nullable=False)
    question_text_en = Column(Text, nullable=False)
    option_a_ar = Column(String, nullable=True)
    option_a_en = Column(String, nullable=True)
    option_b_ar = Column(String, nullable=True)
    option_b_en = Column(String, nullable=True)
    option_c_ar = Column(String, nullable=True)
    option_c_en = Column(String, nullable=True)
    option_d_ar = Column(String, nullable=True)
    option_d_en = Column(String, nullable=True)
    correct_option = Column(String, nullable=True) # for MCQ
    ideal_answer_ar = Column(Text, nullable=True) # for WRITTEN
    ideal_answer_en = Column(Text, nullable=True) # for WRITTEN
    explanation_ar = Column(Text)
    explanation_en = Column(Text)
    created_at = Column(DateTime, default=func.now())

class StudentAnswer(Base):
    __tablename__ = "student_answers"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question_id = Column(Integer, ForeignKey("quiz_bank_questions.id"))
    submitted_answer = Column(Text)
    is_correct = Column(Boolean, nullable=True)
    score = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())
