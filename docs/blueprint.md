# **App Name**: DebugArena

## Core Features:

- Team Registration & Authentication: Allow teams to register with their Team Name, College Name, Email, and a Unique Team ID, storing the data in Firestore. Enforce one device per login and email-based authentication.
- MCQ Round: Present 20 MCQ questions from Set A or Set B, randomly assigned to each team, with a 15-minute timer. Implement auto-submission on timeout and auto-grading with scores stored in Firestore.
- Debugging Round: Provide a split-screen layout with buggy code (Java/Python selectable) on the left and the Monaco editor on the right. Use Judge0 to run code and compare output to hidden test cases, awarding partial scores for close matches.
- Final Round: Simulate a competitive programming environment with problem statement and buggy code on the left, Monaco editor on the right, and Judge0 integration for Java/Python compilation. Determine winners based on hidden test cases and tie-breaking logic that considers fastest correct submission.
- Anti-Cheating System: Implement measures to disable copy/paste, right-click, and block keyboard shortcuts. Detect tab switching and window blur events, issuing warnings and auto-submitting after three warnings to maintain competition integrity.
- Live Leaderboard: Show real-time rankings based on scores and time taken, updated live with auto tie-breaking, providing teams with up-to-the-minute standings.
- Admin Panel: Enable admins to manage MCQs and debugging questions, upload code, set timers, lock/unlock rounds, view submissions, export results, and override scoring, ensuring competition management is streamlined.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) to convey a high-tech and competitive atmosphere.
- Background color: Dark grey (#212121) for a professional dark mode theme.
- Accent color: Electric blue (#29B6F6) to highlight active elements and call-to-action buttons.
- Body text: 'Inter', a grotesque-style sans-serif font with a modern look suitable for body text.
- Headline Font: 'Space Grotesk' a sans-serif with a techy feel; suitable for headlines.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clean, minimalist icons to represent rounds and features.
- Employ a split-screen layout for debugging and final rounds to facilitate coding and problem viewing simultaneously.
- Incorporate smooth transitions and animated countdown timers to provide visual feedback during the competition.