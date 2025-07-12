from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models.mongo import questions_collection

def get_recommendations(question_id, top_k=5):
    questions = list(questions_collection.find({}))
    index_map = {str(q['_id']): i for i, q in enumerate(questions)}
    
    docs = [q['title'] + " " + q['description'] + " " + " ".join(q.get('tags', [])) for q in questions]
    
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(docs)
    
    idx = index_map.get(question_id)
    if idx is None:
        return []
    
    sims = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()
    sims[idx] = 0
    
    top_indices = sims.argsort()[-top_k:][::-1]
    return [str(questions[i]['_id']) for i in top_indices]
