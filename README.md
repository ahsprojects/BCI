# 🧠 Brain-Computer Interface (BCI) System

This project is a full-stack Brain-Computer Interface (BCI) application designed to **capture, process, and visualize brain signals** in real time. It enables communication between a user's brain and a computer system using EEG data and AI/ML techniques. The backend handles signal acquisition, preprocessing, and classification, while the frontend provides a responsive interface to display results.

---

## 🚀 Features
- Real-time EEG data handling and classification  
- FastAPI-powered backend for efficient processing  
- Modern Next.js frontend for seamless visualization  
- Easy-to-deploy and developer-friendly setup  

---

## 📦 Requirements

### Backend:
- Python 3.x
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- Other dependencies listed in `requirements.txt`

### Frontend:
- Node.js (v16+ recommended)
- npm, yarn, pnpm, or bun (any package manager)

---

## ⚙️ Installation & Setup

### 🧠 Backend (API Server)

1. **Clone the repository**  
    ```bash
    git clone https://github.com/umertariq22/BCI-Backend.git
    cd BCI-Backend
    ```

2. **Create and activate a virtual environment**  
    ```bash
    python -m venv venv
    source venv/bin/activate       # On Windows: venv\Scripts\activate
    ```

3. **Install dependencies**  
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the backend server**  
    ```bash
    uvicorn main:app --reload
    ```
    - Replace `main:app` if your app entry point is different.
    - Example with host/port:
      ```bash
      uvicorn main:app --reload --host 0.0.0.0 --port 8000
      ```

---

### 💻 Frontend (User Interface)

1. **Navigate to the frontend directory**  
    ```bash
    cd frontend  # or the correct frontend path
    ```

2. **Install dependencies**  
    ```bash
    npm install      # or yarn / pnpm / bun install
    ```

3. **Start the development server**  
    ```bash
    npm run dev      # or yarn dev / pnpm dev / bun dev
    ```

4. **Visit the app**  
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 What This Project Is About

This BCI system allows users to interact with digital interfaces through brain signals—collected via EEG sensors and processed with machine learning algorithms. It has applications in:
- Neurofeedback and cognitive training  
- Assistive technology for people with disabilities  
- Experimental brain-controlled systems  


