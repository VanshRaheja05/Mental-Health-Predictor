# Project Manual: Mental Health Predictor

This guide provides instructions on how to prepare the project for sharing (minimizing file size) and how to set up and run the application.

## 1. Preparing the Project for Sharing (Minimal File Size)

To reduce the project size for sharing, we will remove generated files and dependencies that can be re-created by the recipient.

**Steps:**

1.  **Navigate to the project root directory:**
    Open your terminal or command prompt and go to:
    `C:\Users\DELL\Desktop\mental health predictor`

2.  **Run the cleanup commands:**
    Execute the following commands one by one. These commands will delete the `venv` (Python virtual environment), `node_modules` (Node.js dependencies), `__pycache__` (Python cache files), and `dist` (frontend build output).

    ```bash
    rmdir /s /q backend\venv
    rmdir /s /q cognifit-ai\cognifit\frontend\node_modules
    rmdir /s /q backend\__pycache__
    rmdir /s /q cognifit-ai\cognifit\frontend\dist
    rmdir /s /q cognifit-ai\cognifit\__pycache__
    ```
    *(Note: If any of these directories don't exist, the command might show an error, which you can ignore.)*

3.  **Zip the project folder:**
    After cleanup, compress the entire `mental health predictor` folder into a `.zip` or `.rar` archive. This archive will now be significantly smaller and ready for sharing.

## 2. Running the Project

To run this project, you will need Python (3.8+) and Node.js (with npm) installed on your system.

**Important Note:** The setup steps (creating virtual environments and installing dependencies) only need to be performed **once** after unzipping the project. For subsequent runs, you only need to activate the virtual environment and start the servers.

**Steps:**

1.  **Unzip the project:**
    Extract the shared `.zip` file to your desired location. Let's assume the extracted folder is `mental health predictor`.

2.  **Set up the Backend:**

    a.  **Navigate to the backend directory:**
        ```bash
        cd "path\to\your\extracted\folder\backend"
        ```
        (Replace `"path\to\your\extracted\folder"` with the actual path where you unzipped the project.)

    b.  **Create a Python virtual environment:**
        ```bash
        python -m venv venv
        ```

    c.  **Activate the virtual environment:**
        *   **On Windows:**
            ```bash
            .\venv\Scripts\activate
            ```
        *   **On macOS/Linux:**
            ```bash
            source venv/bin/activate
            ```

    d.  **Install backend dependencies:**
        ```bash
        pip install -r requirements.txt
        ```

    e.  **Start the FastAPI backend server:**
        ```bash
        uvicorn api:app --host 0.0.0.0 --port 8000 --reload
        ```
        Leave this terminal window open and running.

        (
        this also work sbut may not sometimes:     
        uvicorn api:app --reload
        )

3.  **Set up the Frontend:**

    a.  **Open a NEW terminal window.**

    b.  **Navigate to the frontend directory:**
        ```bash
        cd "path\to\your\extracted\folder\cognifit-ai\cognifit\frontend"
        ```
        (Again, replace `"path\to\your\extracted\folder"`.)

    c.  **Install frontend dependencies:**
        ```bash
        npm install
        ```

    d.  **Start the React development server:**
        ```bash
        npm run dev
        ```
        Leave this terminal window open and running.

4.  **Launch the Application:**

    Once both the Backend and Frontend servers are running in their respective terminals, open your web browser and navigate to:

    `http://localhost:5173`

    The frontend will automatically communicate with your backend running on `http://127.0.0.1:8000`.
