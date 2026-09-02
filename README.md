# AI Trip Planner

A small React application that uses an AI model to turn a free-form trip description into an interactive day-by-day itinerary.

The AI returns structured data rather than conversational text. The application parses and validates that data and renders it as interactive itinerary components.

## Demo

### 🎥 Screen Recording

**[Watch the Demo Video](https://iiitbhopal1-my.sharepoint.com/:v:/g/personal/23u01074_iiitbhopal_ac_in/IQC9XDr7D4sKToEXrLVRRjg5AeTOf_0BLx0Jht78UTU8RAY?e=A8KVwF)**

The recording demonstrates the main functionality of the application:

* Entering a free-form trip description
* Generating an itinerary using AI
* Viewing the itinerary day by day
* Expanding and collapsing days
* Removing stops
* Reordering stops
* Loading, error, and empty states
* The application working on a mobile-sized screen

---

## Features

* Free-form trip description input
* AI-generated day-by-day itinerary
* Structured AI response instead of chatbot output
* Expand/collapse itinerary days
* Remove stops
* Reorder stops
* Loading state
* Error state with retry
* Empty state
* Handling malformed AI responses
* Handling invalid AI response shapes
* Protection against stale AI responses
* Responsive mobile UI

---

## Tech Stack

* **React** — frontend UI and state management
* **TypeScript** — type safety
* **Vite** — frontend tooling
* **Node.js + Express** — small backend for the AI request
* **Google Gemini** — LLM
* **Zod** — validation of structured AI output
* **CSS** — responsive styling

---

## How It Works

The application follows this flow:

```text
User enters trip description
        ↓
React frontend
        ↓
POST /api/trip/generate
        ↓
Express backend
        ↓
Gemini API
        ↓
Structured JSON response
        ↓
JSON parsing + schema validation
        ↓
React state
        ↓
Interactive itinerary
```

The AI is not used as a chatbot. It generates structured itinerary data that the application parses and renders as UI.

For example, the generated data follows a structure similar to:

```json
{
  "title": "Trip to Japan",
  "destination": "Tokyo",
  "summary": "A five-day Tokyo itinerary",
  "days": [
    {
      "day": 1,
      "title": "Tokyo Highlights",
      "stops": [
        {
          "id": "stop-1",
          "name": "Senso-ji Temple",
          "description": "Visit the historic temple",
          "time": "09:00",
          "durationMinutes": 90,
          "category": "culture"
        }
      ]
    }
  ]
}
```

The frontend then uses this data to render the itinerary and manage user interactions.

---

## Project Structure

```text
ai-trip-planner/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripForm.tsx
│   │   │   ├── Itinerary.tsx
│   │   │   ├── DayCard.tsx
│   │   │   ├── StopCard.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── services/
│   │   │   └── tripApi.ts
│   │   │
│   │   ├── types/
│   │   │   └── trip.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── trip.ts
│   │   ├── services/
│   │   │   └── gemini.ts
│   │   ├── schemas/
│   │   │   └── tripSchema.ts
│   │   └── index.ts
│   │
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Setup

### Prerequisites

* Node.js
* npm
* Gemini API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ai-trip-planner
```

### 2. Install dependencies

Install the frontend dependencies:

```bash
cd client
npm install
```

Install the backend dependencies:

```bash
cd ../server
npm install
```

### 3. Add environment variables

Create a `.env` file inside the `server` directory:

```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

The API key is kept on the backend and is not exposed to the browser.

### 4. Start the backend

```bash
cd server
npm run dev
```

### 5. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Then open the local URL provided by Vite.

---

## Usage

1. Enter a trip description in the input field.

Example:

```text
Plan a 4-day trip to Tokyo for two people.
We enjoy food, culture, shopping and photography.
Keep the itinerary reasonably relaxed.
```

2. Click **Generate Itinerary**.

3. The application sends the description to the backend.

4. The backend requests structured itinerary data from Gemini.

5. The response is parsed and validated.

6. The validated itinerary is displayed in the UI.

7. Users can:

   * Expand or collapse a day
   * Remove a stop
   * Move a stop up or down

---

## Handling AI Failures

Because AI output cannot always be assumed to be correct, the application handles several failure cases.

### Malformed JSON

If the AI response cannot be parsed, it is treated as an invalid response instead of being rendered directly.

### Wrong response shape

The generated data is validated against the expected itinerary schema. Invalid data is rejected.

### Empty response

An empty or unusable response results in an error state rather than a broken UI.

### Slow request

A loading state is displayed while the request is in progress.

### Failed request

API failures are caught and shown to the user with an option to retry.

### Stale response

The frontend prevents an older request from overwriting the result of a newer request.

This is important because multiple AI requests can be in flight at the same time.

---

## AI Usage

AI tools were used during development for:

* Brainstorming implementation approaches
* Exploring React component and state-management patterns
* Debugging
* Reviewing error-handling approaches
* Getting implementation suggestions
* Improving parts of the application

The generated suggestions were reviewed and adapted rather than being submitted without understanding them.

The application code, architecture, AI request flow, structured response handling, and React state management are understood and can be explained during the interview.

The assignment explicitly allows AI development tools but expects the submitted code to be understood by the candidate.

---

## Known Limitations

This version focuses on the required Trip Planner functionality.

Current limitations include:

* No authentication
* No database persistence
* No saved itineraries
* No maps or navigation integration
* No hotel or flight booking
* Reordering uses controls rather than drag-and-drop
* AI-generated itinerary quality depends on the model response
* The application requires a valid AI API key

---

## Time Spent

**Total time spent: approximately 8 hours**

The project was intentionally kept within the assignment's suggested time limit.

The main time was spent on:

* React application setup
* AI integration
* Structured response handling
* Validation and error handling
* Interactive itinerary functionality
* Responsive UI
* Testing
* README and demo recording
