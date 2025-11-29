# DocNow - Healthcare Application

DocNow is a comprehensive healthcare application featuring live doctor availability, emergency assistance, AI-powered symptom checking, and medicine ordering.

## 🚀 Features

*   **Live Doctor Availability**: Real-time status updates (Available, Busy, Offline).
*   **Emergency SOS**: Quick access to nearest hospitals and emergency contacts.
*   **AI Health Assistant**: Powered by Google Gemini 2.5 for symptom checking and general queries.
*   **Medicine Ordering**: Add to cart and manage prescriptions.
*   **Dashboard**: Health metrics overview and appointment management.

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS
*   **AI**: Google Gemini API (@google/genai)
*   **Icons**: Lucide React

## 📦 Installation & Local Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/docnow.git
    cd docnow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## ☁️ Deployment

### Deploying to Vercel

1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3.  Import your `docnow` repository.
4.  In the **Environment Variables** section, add:
    *   `API_KEY`: Your Google Gemini API Key.
5.  Click **Deploy**.

### Deploying to Render

1.  Create a new **Static Site** on [Render](https://render.com).
2.  Connect your GitHub repository.
3.  Set the **Build Command** to: `npm run build`
4.  Set the **Publish Directory** to: `dist`
5.  Add your `API_KEY` in the **Environment** tab.

## 📝 License

MIT
