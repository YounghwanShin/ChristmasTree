# My Christmas Tree Project

## Overview

This is a festive and interactive web application that allows users to decorate a Christmas tree with ornaments and leave personalized messages. The project is built using React and styled with responsive CSS to ensure compatibility across different devices. The application also includes an owner view for the tree's owner to manage messages left by users.

## Features

### User Features
- **Tree Decoration**: Users can select ornaments and add them to the Christmas tree.
- **Leave a Message**: Users can leave a personalized message along with their ornament.
- **Responsive Design**: The interface is fully responsive, ensuring a great user experience on both desktop and mobile devices.

### Owner Features
- **Authentication**: Tree owners can log in with a password to access a private view.
- **Manage Messages**: View all messages left by users in a detailed list.

## Project Structure

```plaintext
yh-christmas-tree/
├── public/
│   ├── index.html            # Main HTML file
│   ├── robots.txt            # SEO configuration
│
├── src/
│   ├── assets/               # Static assets (images, etc.)
│   │   ├── ornament1.png
│   │   ├── ornament2.png
│   │   └── ...
│   └── tree.png
│
│   ├── components/           # Reusable components
│   │   ├── OrnamentForm.js   # Form to add ornaments and messages
│   │   ├── OrnamentForm.css
│   │   ├── TreeCanvas.js     # Interactive tree canvas
│   │   ├── TreeCanvas.css
│
│   ├── pages/                # Application pages
│   │   ├── Home.js           # Main page for decorating the tree
│   │   ├── Home.css
│   │   ├── OwnerView.js      # Owner's private page
│   │   ├── OwnerView.css
│
│   ├── App.js                # Main application entry
│   ├── App.css
│   ├── index.js              # React root rendering
│   ├── index.css
│
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Dependency tree lock file
```

## Dependencies

The project is built with the following dependencies:

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For managing navigation between pages.
- **GH-Pages**: To deploy the application to GitHub Pages.

For a complete list of dependencies, see the `package.json` file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YounghwanShin/ChrismasTree.git
   cd ChrismasTree
   ```

2. Update `package.json`:
   - Modify the `homepage` field to match your GitHub Pages URL:
     ```json
     "homepage": "https://<your-github-username>.github.io/<your-repo-name>"
     ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Deployment

To deploy the application to GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Ensure `package.json` includes the correct `homepage` field:
   ```json
   "homepage": "https://<your-github-username>.github.io/<your-repo-name>"
   ```

The application will be available at your GitHub Pages URL.

## Components

### OrnamentForm
- Allows users to add an ornament and leave a message.
- Validates user input to ensure all fields are completed.

### TreeCanvas
- Displays the Christmas tree and ornaments.
- Supports pagination for trees with many ornaments.

### Home Page
- Provides an interface for decorating the tree.
- Displays a list of users who have left messages.

### Owner View
- Private page for the tree owner.
- Displays all messages in a detailed list with authentication.

## Responsive Design

The application uses CSS media queries to ensure a seamless experience on devices with a screen width of 480px and above. Key elements adjust dynamically to maintain usability and aesthetic appeal.

## Future Improvements

- **Enhanced Authentication**: Implement a more secure authentication mechanism for the owner view.
- **Dynamic Ornaments**: Allow users to upload custom ornaments.
- **Advanced Animations**: Add animations to the ornaments for a more engaging experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Enjoy decorating the tree and have a Merry Christmas!

