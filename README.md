# Modern Portfolio Website

A modern, responsive portfolio website built with React 19 and Material UI v6, featuring dark mode support and smooth animations.

## ✨ Features

- 🎨 Beautiful Material Design UI with Material UI v6
- 🌓 Dark/Light mode toggle with MUI theming
- 📱 Fully responsive design with Material UI Grid
- ⚡ Fast and optimized with React 19
- 🎭 Smooth animations with Fade and Zoom effects
- 🧭 Client-side routing with React Router v6
- 📧 Contact form with Material UI components
- 🎯 Projects showcase with filtering
- 🎨 Customizable theme with Material UI theming system

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ and yarn installed

### Installation

1. Clone the repository
```bash
git clone https://github.com/hoomanhajrian/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
yarn build
```

This creates an optimized production build in the `build` folder.

## 🛠️ Tech Stack

- **React 19** - Latest stable React version
- **Material UI v6** - React component library with beautiful design
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework (complementary)
- **Emotion** - CSS-in-JS library for Material UI styling
- **Context API** - State management for dark mode

## 📁 Project Structure

```
portfolio/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   │   └── Navbar.js
│   ├── context/     # React context providers
│   │   └── ThemeContext.js
│   ├── pages/       # Page components
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Projects.js
│   │   └── Contact.js
│   ├── App.js       # Main app component
│   ├── index.js     # Entry point
│   └── index.css    # Global styles
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Customization

### Update Personal Information

Edit the following files to add your information:
- [src/pages/Home.js](src/pages/Home.js) - Update name, title, and social links
- [src/pages/About.js](src/pages/About.js) - Add your skills and experience
- [src/pages/Projects.js](src/pages/Projects.js) - Add your projects
- [src/pages/Contact.js](src/pages/Contact.js) - Update contact information

### Customize Colors

Edit [tailwind.config.js](tailwind.config.js) to change the color scheme:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

## 📝 License

This project is open source and available under the MIT License.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
