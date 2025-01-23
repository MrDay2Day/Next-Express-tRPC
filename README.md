# Full Stack Template

## Core Technologies:

- **TypeScript:** A superset of JavaScript that adds static typing, improving code maintainability and catching errors early on.
- **Next.js:** A React framework for building user interfaces, with features like server-side rendering (SSR), static site generation (SSG), and API routes.
- **Express.js:** A popular Node.js web application framework for building robust and scalable backends.
- **Socket.IO:** A library for real-time, bidirectional communication between the client and server, enabling features like chat, notifications, and live updates.
- **Redis:** An in-memory data store used as a message broker for Socket.IO, providing efficient pub/sub messaging.
- **tRPC:** A type-safe procedure call remote procedure call (RPC) protocol, simplifying data fetching and mutations across your frontend and backend.
- **Cloudflare Workers:** Deploy application on Cloudflare Workers. (NextJs & NextJs APIs Only - This is a stateless deployment express server & services cannot be deployed, Next Middleware are disabled and should be removed.)

## Key Features:

1. Comprehensive Structure:
   - Organized Directories: A well-defined directory structure enhances code readability and maintainability.
     - Utilities: Houses reusable functions, helpers, and custom hooks.
     - Types: Stores type definitions and interfaces for improved code predictability and type safety.
   - Clear Separation of Concerns: Distinct folders for Next.js components, Express routes, Socket.IO logic, and API routes.
1. Multi-API Support:
   - Next.js API Routes: Leverage Next.js' built-in API routes for handling serverless functions within your Next.js application.
   - Express.js API: Utilize Express.js for building a separate, more robust backend API with greater flexibility and control.
   - tRPC Integration: Implement tRPC for type-safe data fetching and mutations in both Next.js and Express.js APIs.
1. Real-time Communication:
   - Socket.IO with Redis: Establish real-time, bi-directional communication between clients and servers using Socket.IO, with Redis as the message broker for efficient message distribution.
1. Cookie Management:
   - Secure Cookie Handling: Implement secure cookie management practices for both Next.js API routes and the Express.js API, ensuring proper security and user data protection.
1. Rendering Strategies:
   - SSR (Server-Side Rendering): Render pages on the server and send the fully rendered HTML to the client, improving initial load times and SEO.
   - SSG (Static Site Generation): Pre-render pages at build time, resulting in fast page loads and excellent performance.
   - Dynamic Pages: Create pages that fetch data at runtime, allowing for dynamic content and user-specific experiences.
1. Sitemap Generation:
   - Built-in Sitemap Support: Utilize Next.js' built-in sitemap generation capabilities.
   - Custom Sitemap Generator: Create a custom sitemap generator for specific routes and subroutes to cater to unique requirements.

## Benefits of this Template:

- Rapid Development: Provides a solid foundation for building applications, saving you time and effort on initial setup and configuration.
- Enhanced Productivity: The well-structured codebase and reusable components promote efficient development and reduce repetitive tasks.
- Improved Code Quality: TypeScript, type-safe APIs, and a focus on best practices lead to more reliable and maintainable code.
- Scalability and Flexibility: The modular design allows for easy expansion and customization to fit the needs of different projects.
- Enhanced Developer Experience: The template offers a smooth development experience with features like real-time communication, secure cookie handling, and robust API support.
- This TypeScript template repository offers a comprehensive and well-crafted starting point for building modern web applications. It effectively combines the power of Next.js, Express.js, and other cutting-edge technologies to provide a robust and flexible foundation for your projects.

## Changes to make

There are just a couple changes that are required to personalize the application.

1. package.json
   - name
   - version
   - description
1. .env
   - NODE_ENV
   - SERVER_URL
   - PORT
   - USE_REDIS
   - REDIS_HOST
   - REDIS_USER
   - REDIS_PASS
   - REDIS_PORT
   - REDIS_URL
   - COOKIE_SECRET
   - JWT_SECRET
1. wrangler.json
   - name
1. worker.js
   - Edit based on need, such as title, body, icon, etc.
   - Choose actions for buttons
