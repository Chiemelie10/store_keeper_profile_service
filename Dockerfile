FROM node:24.7.0-alpine3.21

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source code
COPY . .

# Expose port
EXPOSE 3000

# Executable commands
CMD npx typeorm-ts-node-commonjs migration:run -d src/config/data-source.ts && npm start
