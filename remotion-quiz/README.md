# Interactive AI Video Creation Demo

## Overview
This comprehensive demo showcases the complete workflow for building fully functional interactive videos using OpenRouter free models, Claude Code, and Remotion in iTerm2. It demonstrates how to create engaging educational content with clickable quizzes embedded directly in video players.

## What You'll Learn

### 1. OpenRouter Free Models Setup
- Configure API access for Claude, GPT, and other models
- Set up Remotion to work with OpenRouter's free tier
- Use iTerm2 for terminal-based development

### 2. AI Video Creation Workflow
- Use Claude Code to write Remotion components
- Build interactive video experiences programmatically
- Integrate AI content generation with video rendering

### 3. Interactive Quiz Features
- Embed clickable quizzes inside video content
- Real-time feedback with visual responses
- Seamless user experience across devices

## The Story
This demo tells the story of how AI tools transform video creation. Starting with free model access, progressing through AI-assisted content generation, and ending with interactive user experiences that make educational content truly engaging.

## Key Technologies

- **OpenRouter**: Free access to Claude 3.5 Sonnet, GPT-4, and other models ($5 monthly credit)
- **Claude Code**: Terminal-based AI coding assistant for Remotion development
- **Remotion**: Framework for creating videos with React components
- **@remotion/player**: Component that makes videos clickable and interactive
- **Vite**: Fast development and production build tool

## Interactive Features

### Step-by-Step Learning
The quiz guides you through the complete workflow:
1. **OpenRouter Setup** - Understanding free model access
2. **Video Creation** - How Claude Code and Remotion work together
3. **Interactive Demo** - Testing the clickable video player

### Real-time Feedback
- Green checkmarks for correct answers
- Red X marks for incorrect selections
- Contextual hints for each step
- Progress tracking throughout the learning journey

### Imperfect Interface (Intentionally)
The UI is designed to be approachable and imperfect, reflecting how beginners actually learn new technologies - with trial and error, not perfect polish.

## Running the Demo

### Prerequisites
- Node.js (v18+)
- iTerm2 terminal emulator

### Setup
```bash
cd /path/to/remotion-quiz
npm install  # Install dependencies
npx vite build  # Build for production
```

### Launch
```bash
open -a "Google Chrome" dist/index.html
```

## How It Works

### Step 1: OpenRouter Setup
The demo starts by teaching you about OpenRouter's free tier:
- Access to Claude 3.5 Sonnet without API key setup
- $5 monthly credit for new users
- Native Remotion integration

### Step 2: Video Creation
Claude Code writes Remotion components that:
- Render videos programmatically
- Include interactive quiz overlays
- Maintain video synchronization with UI elements

### Step 3: Interactive Experience
The @remotion/player component:
- Wraps Remotion videos in web interfaces
- Enables clickable elements inside video content
- Provides real-time feedback

## Educational Value

### For Beginners
- Low barrier to entry with free tools
- Step-by-step learning path
- Immediate visual feedback
- Terminal-based development workflow

### For Educators
- Demonstrates modern AI video creation
- Shows interactive learning techniques
- Provides reproducible demo for teaching
- Integrates with existing educational materials

## Technical Architecture

```
iTerm2 (Terminal)
  ↓
Claude Code (AI Assistant)
  ↓
Remotion Components
  ↓
Vite (Build Tool)
  ↓
dist/index.html (Interactive Demo)
  ↓
Google Chrome (Browser)
```

## UX/UI Design Principles

### Imperfect Design
- Uses honest colors and typography
- No marketing fluff or polished aesthetics
- Focus on function over form
- Reflects real-world learning experiences

### Accessibility
- Clear contrast ratios
- Keyboard navigation support
- Responsive design for mobile
- Screen reader friendly

### Progressive Disclosure
- Complex workflow broken into manageable steps
- Hints and guidance provided at appropriate times
- Not overwhelming beginners with options

## GitHub Integration

This project is designed for GitHub hosting with:
- Clear documentation for contributors
- Reproducible build process
- Minimal dependencies
- Focus on educational value over polish

## Contributing

While this is a demonstration project, contributions are welcome:
- Add new quiz questions for different topics
- Improve the workflow documentation
- Create additional interactive demos
- Suggest improvements based on your experience

## License
MIT License

## Note for Instructors

This project is intended as a teaching tool, not production software. It demonstrates:
1. How to leverage free AI tools for educational content
2. The importance of storytelling in technical demos
3. How to make complex workflows approachable
4. The value of imperfect, human-centered design

The focus is on learning and demonstration, not on creating a polished final product.
