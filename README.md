# MindfulJourney Web - AI Therapy Companion

A modern AI-powered therapy platform providing personalized therapeutic support, emotional wellness tracking, and mental health resources.

## Features

- **AI Therapy Sessions**: Engage in personalized therapy sessions with an AI therapist trained on evidence-based therapeutic approaches
- **Emotional Wellness Tracking**: Monitor your emotional states, triggers, and progress over time
- **Guided Therapeutic Exercises**: Access CBT, DBT, and mindfulness exercises tailored to your specific needs
- **Therapy Journal**: Document thoughts and feelings with AI-guided therapeutic prompts
- **Session History**: Review past therapy conversations and track your progress
- **Crisis Support**: Access emergency mental health resources when needed
- **Personalized Treatment Plans**: Receive customized therapeutic recommendations based on your needs

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (Authentication & Database)
- OpenAI (GPT-4)
- Framer Motion
- React Query
- Recharts (for emotional wellness visualizations)

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

## Therapeutic Approaches

MindfulJourney implements various evidence-based therapeutic approaches:

1. **Cognitive Behavioral Therapy (CBT)**: Identifying and challenging negative thought patterns
2. **Dialectical Behavior Therapy (DBT)**: Mindfulness, distress tolerance, emotion regulation
3. **Mindfulness-Based Cognitive Therapy**: Present-moment awareness techniques
4. **Solution-Focused Brief Therapy**: Goal-oriented, solution-focused approaches
5. **Motivational Interviewing**: Techniques to increase motivation for positive change

## Mental Health Design Principles

MindfulJourney adheres to these key design principles for mental health applications:

1. **Calming Aesthetics**: Soft color palette and generous whitespace to reduce anxiety
2. **Reduced Cognitive Load**: Clear navigation and progressive disclosure of information
3. **Emotional Safety**: Content warnings and ability to skip triggering content
4. **Accessibility**: WCAG 2.1 AA compliance for all users
5. **Privacy by Design**: Clear data policies and control over personal information
6. **Crisis Support**: Easily accessible emergency resources
7. **Therapeutic Alliance**: Design that fosters trust and connection with the AI therapist

## Important Disclaimers

- MindfulJourney is not a replacement for professional mental health treatment
- In case of emergency, please contact local emergency services or crisis hotlines
- All AI therapy interactions are based on established therapeutic protocols but should be used as a supplement to professional care when needed

## Companion Mobile App

MindfulJourney has a companion iOS application available at [MindfulJourney Mobile](https://github.com/musamasalla/mindful-journey-mobile) for on-the-go therapeutic support.

## License

This project is licensed under the MIT License - see the LICENSE file for details.