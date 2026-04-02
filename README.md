<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Zorvyn Finance Dashboard

A modern, responsive, and feature-rich finance dashboard built with React, TypeScript, and Tailwind CSS. It features real-time insights, goal tracking, transaction management, and an AI-powered financial assistant.

## Features

- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.
- **Dark Mode:** Full support for dark and light themes.
- **AI Assistant:** Get personalized financial insights powered by AI.
- **Goal Tracking:** Set and monitor your financial goals with progress bars.
- **Transaction Management:** Add, edit, and delete transactions with ease.
- **Interactive Charts:** Visualize your balance trends and spending breakdown.

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd zorvyn-finance-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY="YOUR_API_KEY_HERE"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Deployment

To deploy the app, you can use platforms like **Render**, **Vercel**, or **Netlify**.

1. Connect your GitHub repository to the platform.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Add your `GEMINI_API_KEY` to the platform's environment variables.

