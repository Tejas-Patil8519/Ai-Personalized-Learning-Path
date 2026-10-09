import os
import re
from pathlib import Path
from typing import List, Dict, Any

KB_DIR = Path(__file__).parent / "knowledge_base"

def load_documents() -> List[Dict[str, str]]:
    """Loads all text files from the knowledge base directory."""
    docs = []
    if not KB_DIR.exists():
        KB_DIR.mkdir(parents=True, exist_ok=True)
        return docs
    
    for file_path in KB_DIR.glob("*.txt"):
        try:
            content = file_path.read_text(encoding="utf-8").strip()
            if content:
                docs.append({
                    "filename": file_path.name,
                    "title": file_path.stem.replace("_", " ").title(),
                    "content": content
                })
        except Exception as e:
            print(f"[RAG] Warning reading {file_path.name}: {e}")
    return docs

def chunk_text(text: str, chunk_size: int = 120, overlap: int = 30) -> List[str]:
    """Splits text into overlapping word chunks for fine-grained retrieval."""
    words = text.split()
    if len(words) <= chunk_size:
        return [text]
    
    chunks = []
    step = max(1, chunk_size - overlap)
    for i in range(0, len(words), step):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
        if i + chunk_size >= len(words):
            break
    return chunks

def retrieve_rag_context(query_text: str, top_k: int = 5) -> Dict[str, Any]:
    """
    RAG Retriever:
    Extracts key tokens from the student profile (interests, skills, goals, strengths, weaknesses)
    and retrieves the most relevant chunks from the curated educational knowledge base.
    """
    docs = load_documents()
    if not docs:
        return {"context": "", "sources": [], "chunks_found": 0}
    
    # Extract lowercased query terms
    tokens = set(re.findall(r"\b[a-zA-Z]{3,}\b", query_text.lower()))
    # Filter common stop words
    stop_words = {"the", "and", "for", "with", "that", "this", "from", "have", "been", "will", "what", "more", "like"}
    meaningful_tokens = [t for t in tokens if t not in stop_words]
    
    scored_chunks = []
    for doc in docs:
        chunks = chunk_text(doc["content"])
        for chunk in chunks:
            chunk_lower = chunk.lower()
            score = 0
            for term in meaningful_tokens:
                # Count occurrences and boost exact matches in title or content
                count = chunk_lower.count(term)
                if count > 0:
                    score += count * 2
            
            if score > 0:
                scored_chunks.append({
                    "score": score,
                    "source": doc["title"],
                    "filename": doc["filename"],
                    "chunk": chunk
                })
    
    # Sort by relevance score descending
    scored_chunks.sort(key=lambda x: x["score"], reverse=True)
    selected = scored_chunks[:top_k]
    
    sources = list(dict.fromkeys(item["source"] for item in selected))
    context_text = "\n\n---\n\n".join(
        f"[Knowledge Source: {item['source']}]\n{item['chunk']}" for item in selected
    )
    
    return {
        "context": context_text,
        "sources": sources,
        "chunks_found": len(selected)
    }
