from fastapi import FastAPI
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
import uvicorn
import re
app = FastAPI()
model = OllamaLLM(model="rapportGenerator")

class ClaimInput(BaseModel):
    id: str
    client: str
    Vehicle: str
    Claim_Description: str
    Image_Analysis: str
    Flagged: str
    Estimated_Repair_Cost: str
    Date_of_Incident: str


def generate_response(claim: ClaimInput):
    prompt = (
        "Claim for Wiqaya Insurance: "
        f"Claim ID: {claim.id} - "
        f"Client Name: {claim.client} - "
        f"Vehicle: {claim.Vehicle} - "
        f"Claim Description: {claim.Claim_Description}. - "
        f"Image Analysis: {claim.Image_Analysis}. - "
        f"Flagged: {claim.Flagged} - "
        f"Estimated Repair Cost: {claim.Estimated_Repair_Cost} - "
        f"Date of Incident: {claim.Date_of_Incident}"
    )
    return model.invoke(input=prompt)


@app.post("/generate")
async def generate(claim: ClaimInput):
    result = generate_response(claim)
    cleaned_response = re.sub(r"<think>.*?</think>", "", result, flags=re.DOTALL).strip()
    return {"response": cleaned_response}

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "api":
        uvicorn.run(app, host="0.0.0.0", port=8087)
    else:
        test_claim = ClaimInput(
            id="02458",
            client="Skander Romdhane",
            Vehicle="Kia Picanto",
            Claim_Description="The front windshield is shattered and there are dents on the hood",
            Image_Analysis="Image and claim description match",
            Flagged="NO",
            Estimated_Repair_Cost="$500",
            Date_of_Incident="April 9, 2025"
        )
        print(generate_response(test_claim))
