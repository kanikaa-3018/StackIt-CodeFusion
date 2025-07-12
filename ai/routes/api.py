from fastapi import APIRouter
from services import recommend, summarize, tags, rephrase as rephrase_service
from pydantic import BaseModel

router = APIRouter()

@router.get("/recommend/{question_id}")
def get_recommendations(question_id: str):
    return recommend.get_recommendations(question_id)

class TagRequest(BaseModel):
    text: str

@router.post("/tags")
def suggest_tags(req: TagRequest):
    return {"tags": tags.generate_tags(req.text)}

class SummaryRequest(BaseModel):
    answers: list[str]

@router.post("/summarize")
def summarize_endpoint(req: SummaryRequest):
    return {"summary": summarize.summarize_answers(req.answers)}

class RephraseRequest(BaseModel):
    title: str
    description: str

@router.post("/rephrase")
def rephrase(req: RephraseRequest):
    return {"rephrased": rephrase_service.rephrase_question(req.title, req.description)}

