    
---

### ✅ `creator-dashboard-frontend/README.md`

```markdown
# Creator Dashboard Frontend

## 🚀 Features

- Built with Vite + React
- Clean and responsive dashboard UI
- Authentication integration with backend
- Twitter feed display using backend API
- Environment-based API configuration
- Firebase Hosting ready

---

## 🛠️ Instructions to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/01-Prajwal/vertex-frontend.git
cd into the folder




Install dependencies

bash
Copy
Edit
npm install
Create a .env file

env
Copy
Edit
VITE_REACT_APP_BACKEND_URL=https://node-backend-660228117993.us-central1.run.app
Start the development server

bash
Copy
Edit
npm run dev
App will be available at http://localhost:5173 (or whichever port Vite selects).

☁️ Deployment Steps (Firebase Hosting)
Create .env.production

env
Copy
Edit
VITE_REACT_APP_BACKEND_URL=https://node-backend-660228117993.us-central1.run.app
Build the app

bash
Copy
Edit
npm run build
Deploy with Firebase

bash
Copy
Edit
firebase login
firebase init hosting
# Select "dist" as the public directory, and enable single-page app rewrite
firebase deploy
View your hosted frontend

Firebase will give you a public URL after deployment.

vbnet
Copy
Edit
