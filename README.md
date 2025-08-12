# Social Media App

A full-stack social media application built with MERN stack and socket.io real time communication. Features include user authentication, post creation, real-time interactions, infinite scrolling, and user profiles.

## 🚀 Features

- **Authentication & Authorization**

  - JWT-based authentication with HTTP-only cookies
  - User registration and login
  - Protected routes and middleware
  - Secure password hashing with bcrypt

- **Posts & Content**

  - Create, read, update, and delete posts
  - Image upload support
  - Like/unlike posts with real-time updates
  - Comment system with nested replies
  - Infinite scroll for optimized feed performance

- **User Profiles**

  - View and edit user profiles
  - Follow/unfollow users
  - View followers and following lists
  - User search functionality with debouncing

- **Real-time Features**

  - Instant UI updates with optimistic updates
  - Real-time like/comment counters
  - Live search results
  - Real time messages

- **Modern UI/UX**
  - Responsive design with Chakra UI
  - Dark/light theme support
  - Smooth animations and transitions
  - Loading states and error handling

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logging
- **Socket.io** - Real time communication

## 📁 Project Structure

```
social-media-app/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── app/           # App configuration and providers
│   │   ├── features/      # Feature-based modules
│   │   │   ├── auth/      # Authentication
│   │   │   ├── posts/     # Posts functionality
│   │   │   ├── profile/   # User profiles
│   │   │   └── search-bar/# Search functionality
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── shared/        # Shared utilities and types
│   ├── package.json
│   └── ...
├── server/                # Backend Node.js app
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── lib/           # Utility functions
│   │   └── app.js         # Express app setup
│   ├── package.json
│   └── ...
├── package.json           # Root package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   pnpm install

   # Install client dependencies
   cd client && pnpm install

   # Install server dependencies
   cd ../server && pnpm install
   ```

3. **Set up environment variables**

   Create `.env` files in both client and server directories:

   **Server (.env)**

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/social-media-app
   JWT_SECRET=your-super-secure-jwt-secret-key
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **Client (.env)**

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development servers**

   **Option 1: Using concurrently (recommended)**

   ```bash
   # From root directory
   npm install -g concurrently
   pnpm dev
   ```

   **Option 2: Separate terminals**

   ```bash
   # Terminal 1 - Backend
   cd server && pnpm dev

   # Terminal 2 - Frontend
   cd client && pnpm dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status

### User Routes

- `GET /api/user/me` - Get current user profile
- `GET /api/user/profile/:username` - Get user profile by username
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/follow/:id` - Follow user
- `PUT /api/user/unfollow/:id` - Unfollow user
- `GET /api/user/search` - Search users
- `GET /api/user/suggestions` - Get suggested users

### Post Routes

- `GET /api/posts` - Get posts (with pagination)
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/posts/like/:id` - Like post
- `PUT /api/posts/unlike/:id` - Unlike post
- `POST /api/posts/comment/:id` - Add comment
- `DELETE /api/posts/comment/:id/:comment_id` - Delete comment

## 🔧 Scripts

### Root Level

```bash
pnpm dev          # Start both client and server
pnpm dev:client   # Start only client
pnpm dev:server   # Start only server
```

### Client

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Server

```bash
pnpm dev          # Start development server with nodemon
```

## 🔒 Security Features

- HTTP-only cookies for JWT tokens
- CORS configuration
- Helmet for security headers
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting (recommended for production)

## 📱 Performance Optimizations

- **Infinite Scrolling**: Efficient loading of posts
- **Debounced Search**: Optimized search with request cancellation
- **Optimistic Updates**: Instant UI feedback
- **Image Optimization**: Efficient image handling
- **Code Splitting**: Lazy loading of components
- **Caching**: TanStack Query for intelligent caching

## 🧪 Testing

```bash
# Run client tests
cd client && pnpm test

# Run server tests
cd server && pnpm test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)

```bash
cd client
pnpm build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)

```bash
cd server
# Set environment variables
# Deploy to your preferred platform
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) for the component library
- [TanStack Query](https://tanstack.com/query) for server state management
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling
- [Express](https://expressjs.com/) for the web framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact [akedilbekbolatov@gmail.com](mailto:akedilbekbolatov@gmail.com).

---

Made with ❤️ by Akedil
