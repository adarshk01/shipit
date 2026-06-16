# ShipIt 🚀

A Vercel-inspired deployment platform that automates application builds, deployments, and hosting, enabling developers to ship web applications with minimal operational overhead.

## Overview

ShipIt is a comprehensive full-stack deployment platform designed to streamline the deployment workflow. Connect your repositories, configure build settings, and deploy your applications with a single click. No more complex infrastructure management—just ship it!

## Tech Stack

### Frontend
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animation:** GSAP (GreenSock Animation Platform)
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Authentication:** Auth0
- **Routing:** React Router v7
- **Parsing:** Cheerio

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with Auth0
- **AWS Integration:** S3 for storage
- **Real-time:** Redis
- **Type Safety:** Full TypeScript implementation

### Worker
- **Purpose:** Handles application builds and deployments
- **Key Dependencies:**
  - Docker (via dockerode) for containerization
  - Puppeteer for screenshot/rendering
  - AWS SDK for cloud operations
  - Redis for job queuing
  - Tar for compression

## Project Structure

```
shipit/
├── frontend/          # React-based web application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express.js API server
│   ├── src/
│   ├── prisma/        # Database schema
│   └── package.json
├── worker/            # Deployment worker service
│   ├── src/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Redis instance
- AWS account (for S3 storage)
- Auth0 application (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adarshk01/shipit.git
   cd shipit
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Configure environment variables
   cp .env.example .env
   npm run dev
   ```

4. **Setup Worker**
   ```bash
   cd worker
   npm install
   npm run dev
   ```

## Environment Variables

Create `.env` files in each directory with the following variables:

### Backend
```env
DATABASE_URL=postgresql://user:password@localhost:5432/shipit
REDIS_URL=redis://localhost:6379
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
```

### Frontend
```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_API_URL=http://localhost:3000
```

### Worker
```env
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run test` - Run tests

### Worker
- `npm run dev` - Start worker process

## Key Features

- 🔐 **Authentication** - Secure Auth0 integration
- 📦 **Build Automation** - Automated builds via Docker
- 🚀 **One-Click Deployment** - Deploy directly from Git repositories
- 🔄 **Real-time Updates** - Live deployment status with Redis
- 🖼️ **Screenshots** - Capture application screenshots with Puppeteer
- ☁️ **Cloud Storage** - AWS S3 integration for artifacts
- 📊 **Performance Optimized** - Built with performance in mind
- 🎨 **Modern UI** - Smooth animations and responsive design

## Architecture

ShipIt uses a three-tier architecture:

1. **Frontend** - React application for user interaction
2. **Backend** - Express API handling business logic and authentication
3. **Worker** - Separate service handling resource-intensive deployment tasks

This separation allows for scalable, asynchronous deployment processing.

## Database

The project uses Prisma ORM with PostgreSQL. Key models include:
- Users
- Projects
- Deployments
- Builds

To manage the database:
```bash
cd backend
npx prisma migrate dev    # Create/apply migrations
npx prisma studio        # Open Prisma Studio GUI
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For issues and feature requests, please open an issue on [GitHub](https://github.com/adarshk01/shipit/issues).

---

**Built with ❤️ by [@adarshk01](https://github.com/adarshk01)**
