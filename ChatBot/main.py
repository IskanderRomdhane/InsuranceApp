from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import uvicorn
import re

model = OllamaLLM(model='WiqayaChatBotV2')


def handle_conversation():
    print("👋 Salut ! Je suis le chatbot de Wiqaya. Comment puis-je vous aider aujourd’hui ?")
    while True:
        user_input = input("Vous : ")
        if user_input.lower() == "exit":
            print("À bientôt !")
            break
        else:
            result = model.invoke(user_input)
            print(f"Chatbot : {result.strip()}")

app = FastAPI()

class ChatRequest(BaseModel):
    question: str

@app.post("/chat")
async def chat(req: ChatRequest):
    result = model.invoke(req.question)
    cleaned_response = re.sub(r"<think>.*?</think>", "", result, flags=re.DOTALL).strip()
    return {"response": cleaned_response}

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "api":
        uvicorn.run(app, host="0.0.0.0", port=8085)
    else:
        handle_conversation()