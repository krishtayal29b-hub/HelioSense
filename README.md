# HelioSense (SuryaFlare AI)

Forecasting and Nowcasting of Solar Flares using combined Soft X-ray and Hard X-ray data (simulated for the Aditya-L1 mission).

## Architecture
- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, React Three Fiber, Recharts.
- **Backend**: Python 3, FastAPI, Uvicorn, Pandas, Scikit-learn, WebSockets.

---

## Local Development Setup

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python main.py
   ```
   The backend will run on `http://localhost:8000`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (use legacy peer deps if React Three Fiber throws peer conflicts with React 18):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

## Deployment Guide

### Deploying the Backend (e.g., Render, Railway)
1. Push the `backend` folder to a GitHub repository (or deploy from a monorepo specifying the root directory as `backend`).
2. Set the build command to `pip install -r requirements.txt`.
3. Set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
4. Ensure the deployment platform supports WebSockets (most modern platforms like Render do by default).
5. Note the deployed URL (e.g., `https://heliosense-api.onrender.com`).

### Deploying the Frontend (e.g., Vercel, Netlify)
1. Push the `frontend` folder to a GitHub repository.
2. In Vercel, create a new project and import the repository.
3. Set the Root Directory to `frontend`.
4. Set the following Environment Variable in the Vercel dashboard:
   - `VITE_WS_URL` = `wss://heliosense-api.onrender.com/ws/live-data` (replace with your actual backend domain).
5. Deploy the application.

## Disclaimer
This app is for research, education, and prototype demonstration. It should not be used as an official space-weather warning system without validation from authorized agencies.
