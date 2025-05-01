# Creator Dashboard Frontend

## 🚀 Features

- Built with Vite + React
- Clean and responsive dashboard UI
- Authentication integration with backend
- Twitter, Reddit feed display using backend API
- Credit points system
- User features:
  - Save posts
  - Share content
  - Report inappropriate content
  - Complete profile and earn credits
  - logging in every 12 hours adds 1 cred point.
- Admin features:
  - View total users
  - Access analytics dashboard
  - Manage user credits (increment/decrement)
- Environment-based API configuration
- Firebase Hosting ready

## 👑 Admin Credentials

Use these credentials to access the admin dashboard:

```
Email: admin@example.com
Password: admin123
```

## 🛠️ Instructions to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/01-Prajwal/vertex-frontend.git
   cd vertex-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a .env file**
   ```env
   VITE_REACT_APP_BACKEND_URL=https://node-backend-660228117993.us-central1.run.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**  
   App will be available at http://localhost:5173 (or whichever port Vite selects).

## ☁️ Deployment Steps (Firebase Hosting)

1. **Create .env.production**
   ```env
   VITE_REACT_APP_BACKEND_URL=https://node-backend-660228117993.us-central1.run.app
   ```

2. **Build the app**
   ```bash
   npm run build
   ```

3. **Deploy with Firebase**
   ```bash
   firebase login
   firebase init hosting
   # Select "dist" as the public directory, and enable single-page app rewrite
   firebase deploy
   ```

4. **View your hosted frontend**  
   Firebase will provide a public URL after deployment.

## 📂 Project Structure

```
creator-dashboard-frontend/
│
├── public/
│   └── assets/             # Static assets
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Auth/           # Authentication components
│   │   ├── Dashboard/      # Dashboard components
│   │   └── Shared/         # Shared components
│   │
│   ├── pages/              # Application pages
│   │   ├── AdminPanel/     # Admin dashboard pages
│   │   ├── Auth/           # Login/Signup pages
│   │   └── Dashboard/      # User dashboard pages
│   │
│   ├── services/           # API service layer
│   ├── store/              # State management
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── .env                    # Development environment variables
├── .env.production         # Production environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔗 Backend Integration

This frontend connects to the [Creator Dashboard Backend](https://github.com/01-Prajwal/vertex-backend-) deployed at:
- https://node-backend-660228117993.us-central1.run.app

## 🌐 Technologies Used

- React 18
- Vite
- React Router v6
- Axios for API requests
- Context API for state management
- Tailwind CSS for styling
- Firebase for hosting



## 👨‍💻 Author

Prajwal - [GitHub](https://github.com/01-Prajwal)
