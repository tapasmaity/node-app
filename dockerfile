# Use the official Node.js image.
# The tag "lts" refers to the latest LTS (Long Term Support) version.
FROM node:lts

# Copy the rest of the application code to the working directory.
COPY . .

# Install the dependencies.
RUN npm install


# Expose the port on which your app will run.
EXPOSE 3000

# Command to run the application.
CMD ["npm", "start"]
