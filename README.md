# Portfolio Website

A modern portfolio website built with React. Featuring smooth animations and a colorful editorial aesthetic.

## Color Scheme
My current palette was inspired by colors of water lilies.
- **Light Gray**: #D7DEDF
- **Slate**: #4F6064
- **Deep Plum**: #701648
- **Dark Magenta**: #5A123A
- **Soft Periwinkle**: #B9C5F3

## Features
- Custom color scheme with refined aesthetic
- Smooth scroll animations and transitions
- Fully responsive design
- Single-page application for simplicity
- Built with React and Vite

## Setup

- Node.js (v16 or higher)
- npm or yarn
- Git

### Initial Setup

1. **Initialize Git repository**
   ```bash
   git init
   ```

2. **Add all files**
   ```bash
   git add .
   ```

3. **Create initial commit**
   ```bash
   git commit -m "Initial commit: Portfolio website setup"
   ```

4. **Create GitHub repository**
   - Go to GitHub.com and create a new repository
   - Don't initialize with README (you already have one)

5. **Connect to remote repository**
   ```bash
   git remote add origin https://github.com/yourusername/portfolio-website.git
   git branch -M main
   git push -u origin main
   ```

### Daily Git Workflow

```bash
# Check what files have changed
git status

# Add specific files
git add filename.jsx

# Or add all changes
git add .

# Commit with a descriptive message
git commit -m "Add new project to portfolio"

# Push to GitHub
git push

# Pull latest changes (if working from multiple locations)
git pull
```

### Common Git Commands

```bash
# View commit history
git log --oneline

# Create a new branch for features
git checkout -b feature/new-section

# Switch back to main branch
git checkout main

# Merge a feature branch
git merge feature/new-section

# Discard changes in a file
git checkout -- filename.jsx

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## Personalization

### Update Your Information

1. **Edit personal details** in `src/portfolio.jsx`:
   - Search for "YourName" and replace with your actual name
   - Update email, GitHub, and LinkedIn links
   - Modify the hero section description

2. **Add your projects**:
   - Find the `projects` array in `src/portfolio.jsx`
   - Replace placeholder projects with your actual work
   - Update images, descriptions, and tags

3. **Customize skills**:
   - Update the skills categories in the About section
   - Add or remove technologies as needed

### Design Choices

- `#D7DEDF` - Light gray backgrounds
- `#4F6064` - Slate for text and accents
- `#701648` - Deep plum for primary actions
- `#5A123A` - Dark magenta for headings
- `#B9C5F3` - Soft periwinkle for highlights

- I really wanted to make this more colorful and interactive. I fequently see basic (and boring...) personal websites for technical/non-design majors. Why not make it fun. Decided to implement cursor trail feature by [SarahWFox CodePen](https://codepen.io/sarahwfox/pen/pNrYGb) and made it less stimulating with fewer particles and no static animation.

### Add New Sections

1. Create a new section component in `src/portfolio.jsx`
2. Add navigation link in the nav menu
3. Update the scroll handler to include the new section

## Deployment Options

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

### Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify's deploy interface
3. Or connect your GitHub repo for automatic deployments

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/portfolio-website",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## Project Structure

```
portfolio-website/
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Main App component
│   └── portfolio.jsx     # Portfolio component with all sections
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS-in-JS** - Inline styles with React
- **Google Fonts** - Fraunces & Inter typography

## Performance
- Images are loaded from Unsplash CDN (replace with your own optimized images)
- Animations use CSS transforms for better performance
- Single-page design minimizes loading times

## Resources

- [React documentation](https://react.dev)
- [Vite](https://vitejs.dev)

## License

This project is open source and available for personal use. Customize it and make it your own!

---

**Ready to launch your portfolio?** Start by running `npm install` and `npm run dev`!
