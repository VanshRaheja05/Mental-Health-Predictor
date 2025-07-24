from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware # Added for CORS
import webbrowser, threading, os
from pathlib import Path

from model_utils import preprocess, model


app = FastAPI(title="Mental‑Health Predictor API")

# Added CORS middleware
origins = [
    "http://localhost",
    "http://localhost:5173", # Your frontend development server
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# 1) Define frontend_dist path (needs to be at the top)
# -------------------------------------------------
frontend_dist = (
    Path(__file__).resolve().parent.parent / "cognifit-ai" / "cognifit" / "frontend" / "dist"
)
if not frontend_dist.exists():
    raise RuntimeError(f"⚠️  Build the frontend first: {frontend_dist} not found")

# -------------------------------------------------
# 2) Input schema
# -------------------------------------------------
class InputData(BaseModel):
    age: int
    no_employees_mid: int
    leave: int
    work_interfere: int
    self_employed: int
    family_history: int
    remote_work: int
    tech_company: int
    benefits: int
    care_options: int
    wellness_program: int
    seek_help: int
    anonymity: int
    mental_health_interview: int
    phys_health_interview: int
    mental_vs_physical: int
    mental_health_consequence: int
    phys_health_consequence: int
    obs_consequence: int
    coworkers: int
    supervisor: int
    gender: str                      # "male"|"female"|"other"


# -------------------------------------------------
# 3) Prediction route
# -------------------------------------------------
@app.post("/api/predict/")
def predict(data: InputData):
    try:
        df = preprocess(data.dict())
        pred = model.predict(df)[0]
        risk = "High risk" if pred == 1 else "Low risk"
        return {"prediction": risk}
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test")
def test_endpoint():
    return {"message": "Test endpoint is working!"}


# -------------------------------------------------
# 4) Auto-open browser (keep as is)
# -------------------------------------------------
def launch_browser():
    webbrowser.open("http://127.0.0.1:8000/")
threading.Timer(1.5, launch_browser).start()

# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------
# 6) Static files mount for assets (JS, CSS, images)
# -------------------------------------------------
app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="assets")

# -------------------------------------------------
# 7) Static files mount for images
# -------------------------------------------------
app.mount("/images", StaticFiles(directory=frontend_dist / "images"), name="images")

# -------------------------------------------------
# 8) Catch-all for client-side routes (serves index.html)
#    This MUST be AFTER all API routes and static mounts.
# -------------------------------------------------
@app.get("/{full_path:path}")
async def serve_frontend_catch_all(full_path: str):
    return FileResponse(frontend_dist / "index.html")

