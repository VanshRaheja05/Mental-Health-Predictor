# Project Context: Mental Health Predictor

This document provides a concise overview of the "Mental Health Predictor" project, its structure, key functionalities, and essential setup information for future development.

## 1. Project Overview

This project is a web application designed to predict mental health risk based on user input. It consists of a FastAPI backend for the prediction logic and a React frontend for the user interface.

## 2. Technology Stack

*   **Backend:** Python (FastAPI, scikit-learn, pandas)
*   **Frontend:** React (JavaScript/JSX), Vite, npm/bun
*   **Data:** CSV/Excel files for training data.

## 3. Project Structure and Key Files

The project is organized into a root directory with separate folders for the backend and frontend, along with data and model files.

```
mental health predictor/
├── cleaned_dataset.csv         # Cleaned dataset used for model training
├── data_cleaning.py            # Script for data preprocessing
├── mental_health_model.pkl     # Trained machine learning model (serialized)
├── mental_health.csv           # Raw dataset
├── mental_health.xlsx          # Raw dataset (Excel format)
├── model_training.py           # Script for training the ML model
├── README.md                   # General project README
├── backend/
│   ├── api.py                  # FastAPI application entry point, API routes, serves frontend
│   ├── model_utils.py          # Contains data preprocessing and model loading logic
│   ├── requirements.txt        # Python dependencies for the backend
│   └── venv/                   # Python virtual environment (recreated on setup)
└── cognifit-ai/
    └── cognifit/
        └── frontend/
            ├── src/
            │   ├── App.jsx             # Main React application component
            │   ├── main.jsx            # React application entry point
            │   ├── components/
            │   │   ├── Checkup.jsx     # Mental health checkup form component
            │   │   └── checkup.css     # Styling for the Checkup component
            ├── public/                 # Static assets (e.g., images)
            ├── vite.config.js          # Vite build configuration
            ├── package.json            # Frontend dependencies and scripts
            ├── node_modules/           # Node.js dependencies (recreated on setup)
            └── dist/                   # Frontend production build output (recreated on build)
```

## 4. Key Functionality & Interaction

### Backend (`backend/api.py`)

*   **API Endpoint:** Exposes a `/api/predict/` POST endpoint that accepts user input, preprocesses it using `model_utils.py`, and returns a mental health risk prediction.
*   **Frontend Serving:** Configured to serve the static files of the React frontend (from `cognifit-ai/cognifit/frontend/dist/`).
    *   `@app.get("/")`: Serves `index.html` for the root path.
    *   `app.mount("/assets", ...)`: Serves JavaScript and CSS bundles.
    *   `app.mount("/images", ...)`: Serves images.
    *   `@app.get("/{full_path:path}")`: A catch-all route that serves `index.html` for any path not handled by API routes or specific static files, enabling client-side routing on reloads.
*   **CORS Configuration:** Includes `CORSMiddleware` to allow cross-origin requests from the frontend development server (`http://localhost:5173`, `http://127.0.0.1:5173`), crucial for development.

### Frontend (`cognifit-ai/cognifit/frontend/src/`)

*   **Single Page Application (SPA):** Built with React, providing a dynamic user interface.
*   **Checkup Form:** The `Checkup.jsx` component collects user data, including an age slider (18-120, required, with value display).
*   **API Communication:** Makes `POST` requests to the backend's `/api/predict/` endpoint to get predictions.

## 5. Development & Running

For efficient development, it's recommended to run the backend and frontend development servers concurrently in separate terminals.

*   **Backend Development Server:**
    *   Navigate to `backend/`.
    *   Activate Python `venv`.
    *   Run: `uvicorn api:app --host 0.0.0.0 --port 8000 --reload` (for auto-reloading on code changes).
*   **Frontend Development Server:**
    *   Navigate to `cognifit-ai/cognifit/frontend/`.
    *   Run: `npm run dev` (for Hot Module Replacement and fast frontend updates).

The frontend will typically be accessible at `http://localhost:5173`, and it will make API calls to the backend at `http://127.0.0.1:8000`.

## 6. Important Notes for Developers

*   **Frontend Build:** For production deployment, run `npm run build` in the `cognifit-ai/cognifit/frontend/` directory to create optimized static assets in the `dist/` folder.
*   **Path Management:** The `frontend_dist` variable in `backend/api.py` (`Path(__file__).resolve().parent.parent / "cognifit-ai" / "cognifit" / "frontend" / "dist"`) is critical for the backend to locate the built frontend files.
*   **CORS:** The CORS configuration in `api.py` is specifically for development. For production, you might need to adjust `allow_origins` to your production domain(s) or use a reverse proxy (like Nginx) to handle CORS.
