# Blogify - A Blogging Application

Blogify is a blogging application built with EJS, Bootstrap, Node.js, Express, and MongoDB. It allows users to perform CRUD operations on blogs, featuring authentication and authorization using JWT. Anyone can access and read public blogs, and users can create blogs that are accessible to all users. Other users can view and comment on these blogs, and only the blog owner can delete their created blogs.

## Installation Guide

### Clone Repository
```bash
git clone https://github.com/Anushka66/Blogify.git
```

### Install Dependencies
```bash
cd Blogify/blogApp
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory of the `blogApp` folder and add the following environment variables:

```
PORT=3000
CONNECTION_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

### Application Start
```bash
npm start
```
OR
```bash
npm run dev
```

### Access Blogify
Open your browser and navigate to `localhost:3000`.

### Access Deployed Version
You can access the deployed version of Blogify at [https://blogify-3.onrender.com/](https://blogify-3.onrender.com/).

## Features

- User authentication and authorization using JWT.
- Public access to read blogs.
- Users can create blogs accessible to all users.
- View and comment on other users' blogs.
- Blog owners can delete their created blogs.

## Technologies Used

- EJS (Embedded JavaScript) - Dynamic HTML templating.
- Bootstrap - Front-end design and UI components.
- Node.js - Server-side JavaScript runtime.
- Express.js - Web application framework.
- MongoDB - NoSQL database for data storage.
- JWT (JSON Web Tokens) - For user authentication and authorization.

## Future Enhancements

- Integration with third-party services for social media sharing.
- Implementing user roles and permissions for content moderation.
- Adding support for multimedia content such as images and videos in blog posts.

## Purpose

Blogify aims to provide an intuitive and feature-rich platform for bloggers to create, manage, and share their content effectively. By leveraging modern web development technologies, the project offers a seamless blogging experience for both authors and readers.
