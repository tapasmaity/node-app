# Use an official Node.js runtime as a parent image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Expose port 3000 (Vite dev server)
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
