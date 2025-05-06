import torch
import clip
from PIL import Image
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn
import requests
from io import BytesIO

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

def check_image_match(image_url, match_text, false_text="a new car"):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content)).convert("RGB")
    image = preprocess(img).unsqueeze(0).to(device)
    texts = [match_text, false_text]
    text_inputs = clip.tokenize(texts).to(device)
    with torch.no_grad():
        logits_per_image, _ = model(image, text_inputs)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy()[0]
    return {
        "match text probability": float(probs[0]) * 100,
        "false text probability": float(probs[1]) * 100,
        "result": "YES" if probs[0] < 0.5 else "NO"
    }

    
def generer_rapport(object , description , flag ) :
    return ""

app = FastAPI()

class Sinistre(BaseModel):
    path: str 
    objet: str

@app.post("/check")
async def check(req: Sinistre):
    result = check_image_match(req.path, req.objet)
    return JSONResponse(content=result)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8086)
