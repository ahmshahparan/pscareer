# Per Scholas Career Pathway Visualization

An interactive career pathway visualization similar to CyberSeek, designed specifically for Per Scholas course data. This application shows the progression from foundation courses through advanced training to career outcomes.

## Features

- **Interactive Course Exploration**: Click on courses to see detailed information
- **Career Progression Tracking**: Visualize advancement from Entry to Mid to Advanced levels
- **Prerequisites Visualization**: Clear display of course dependencies
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search & Filtering**: Find courses by name, domain, or skills

## Technology Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```

3. Build for production:
   ```bash
   pnpm run build
   ```

## Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. Push this repository to GitHub
2. Connect your GitHub account to Vercel
3. Import the repository in Vercel
4. Vercel will automatically detect the configuration and deploy

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## Project Structure

```
src/
├── components/ui/          # shadcn/ui components
├── data/
│   └── pathwayData.js     # Career pathway data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── App.jsx               # Main application component
├── App.css               # Application styles
├── index.css             # Global styles
└── main.jsx              # Application entry point
```

## Data Structure

The application uses data that matches the Per Scholas spreadsheet structure:

- **Foundation Courses**: Entry-level courses with no prerequisites
- **Advanced Courses**: Courses that require prerequisites
- **Career Progression**: Shows advancement within roles (Entry → Mid → Advanced)
- **Prerequisites**: Clear dependency relationships between courses

## Customization

To update the career pathway data, modify the `src/data/pathwayData.js` file with your specific courses, prerequisites, and career outcomes.

## License

This project is created for Per Scholas career pathway visualization.

