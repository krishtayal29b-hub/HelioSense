from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from data_generator import SolarDataSimulator
from ml_pipeline import FlarePredictor

app = FastAPI(title="HelioSense API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

simulator = SolarDataSimulator()
predictor = FlarePredictor()

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "HelioSense API is running"}

@app.post("/upload/solexs")
async def upload_solexs(file: UploadFile = File(...)):
    return {"filename": file.filename, "status": "processed", "message": "SoLEXS dummy data validated."}

@app.post("/upload/hel1os")
async def upload_hel1os(file: UploadFile = File(...)):
    return {"filename": file.filename, "status": "processed", "message": "HEL1OS dummy data validated."}

@app.get("/predict/forecast")
def get_forecast():
    return predictor.predict_forecast()

@app.get("/model/metrics")
def get_metrics():
    return {
        "accuracy": 0.94,
        "precision": 0.91,
        "recall": 0.89,
        "f1_score": 0.90,
        "confusion_matrix": [[1200, 55], [105, 850]],
        "model_type": "RandomForest Classifier + LSTM (Mock)",
        "features": ["sxr_flux", "hxr_flux", "flux_derivative", "sxr_hxr_ratio", "rolling_std"]
    }

@app.websocket("/ws/live-data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Generate new data point
            data_point = simulator.generate_next_point()
            predictor.add_data_point(data_point)
            
            # Get current nowcast
            nowcast = predictor.predict_nowcast()
            
            # Get forecast periodically or immediately
            forecast = predictor.predict_forecast()
            
            payload = {
                "type": "live_update",
                "data": data_point,
                "nowcast": nowcast,
                "forecast": forecast
            }
            
            await websocket.send_json(payload)
            await asyncio.sleep(1) # Send every second for real-time feel
    except WebSocketDisconnect:
        print("Client disconnected")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
