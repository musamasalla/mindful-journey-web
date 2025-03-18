# MindfulJourney Web

A modern mental health and wellness web application featuring AI-guided meditations, mood tracking, and personalized support.

## Features

- **Daily Wellness Tips**: Receive personalized mental wellness tips and affirmations
- **Mood Tracking**: Track your daily mood, emotions, and triggers with visual insights
- **Guided Meditations**: Access AI-generated guided meditations for anxiety, stress, and depression
- **Journaling**: Express thoughts with AI-assisted journal prompts and reflection tools
- **Community Support**: Connect anonymously with others on their mental wellness journey
- **CBT Exercises**: Interactive cognitive behavioral therapy exercises to challenge negative thoughts
- **Resource Hub**: Access professional mental health resources and crisis support information
- **Personalized Recommendations**: Receive content tailored to your specific mental health needs

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (Authentication & Database)
- OpenAI (GPT-4 & DALL-E)
- Framer Motion
- React Query
- Recharts (for mood tracking visualizations)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/musamasalla/mindful-journey-web.git
cd mindful-journey-web
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components and routes
- `/src/features` - Feature-specific components and logic
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utilities and API clients
- `/src/types` - TypeScript type definitions
- `/src/context` - React context providers
- `/supabase` - Supabase configurations and functions

## Mental Health Design Principles

MindfulJourney adheres to these key design principles for mental health applications:

1. **Calming Aesthetics**: Soft color palette and generous whitespace to reduce anxiety
2. **Reduced Cognitive Load**: Clear navigation and progressive disclosure of information
3. **Emotional Safety**: Content warnings and ability to skip triggering content
4. **Accessibility**: WCAG 2.1 AA compliance for all users
5. **Privacy by Design**: Clear data policies and control over personal information
6. **Crisis Support**: Easily accessible emergency resources
7. **Positive Reinforcement**: Celebration of small achievements in mental wellness

## Companion Mobile App

MindfulJourney has a companion iOS application available at [MindfulJourney Mobile](https://github.com/musamasalla/mindful-journey-mobile) for on-the-go support and continuous care.

## License

This project is licensed under the MIT License - see the LICENSE file for details.