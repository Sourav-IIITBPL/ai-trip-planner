# AI Trip Planner

An AI-powered interactive trip planner built with React,
TypeScript, Express, Gemini, and Zod.

## Features

- Free-form trip description
- AI-generated structured itinerary
- Day-by-day itinerary
- Expand/collapse days
- Remove stops
- Reorder stops
- Loading state
- Error state
- Empty state
- AI response validation
- Malformed-response handling
- Stale-request protection
- Responsive mobile UI

## Tech Stack

- React
- TypeScript
- Vite
- Express
- Gemini API
- Zod

## Architecture

The React frontend sends the user's trip description
to the Express backend. The backend calls Gemini and
requests structured JSON. The response is parsed and
validated using Zod before being returned to the frontend.

## Setup

### Requirements

- Node.js
- Gemini API key

### Installation

Clone the repository.

Install frontend dependencies:

```bash
cd client
npm install