## How It Works in Docker

This project is designed to run in a Dockerized environment, making it easy to set up and deploy. Here's how it works:

1. **Docker Setup**:

   - The `Dockerfile` defines the build process for the Next.js application. It installs dependencies, builds the application, and sets up the container to serve the app.
   - The `docker-compose.yml` file orchestrates multiple services, including the Next.js app and a MongoDB database.

2. **Services**:

   - **MongoDB**: A MongoDB container is set up with the latest MongoDB image. It exposes port `27017` and uses environment variables for the root username and password.
   - **Next.js App**: The Next.js application is built and served in a container. It depends on the MongoDB service and connects to it using environment variables.

3. **Environment Variables**:

   - The project uses environment variables to configure the MongoDB connection (e.g., `MONGO_HOST`, `MONGO_PORT`, `MONGO_USER`, `MONGO_PASS`). These should be defined in a `.env` file.

4. **Volumes**:

   - A Docker volume (`mongo_data`) is used to persist MongoDB data, ensuring that the database retains its state even if the container is restarted.

5. **Running the Project**:

   - To start the project, run the following command:
     ```bash
     docker-compose up --build
     ```
   - This will build the Next.js app, start the MongoDB service, and run both containers.

6. **Accessing the Application**:

   - Once the containers are running, the Next.js app will be available at [http://localhost:3000](http://localhost:3000).
   - The MongoDB service will be accessible on `localhost:27017`.

7. **Starting MongoDB Locally on Another Machine**:

   - You need to connect to MongoDB running on another machine, ensure MongoDB is started locally on that machine. Use the following command:
     ```bash
     mongosh -u <username> -p <password> --authenticationDatabase admin --host 127.0.0.1 --port 27017
     ```
   - Replace `<username>` and `<password>` with the appropriate username and password.

8. **Stopping the Project**:

   - To stop the containers, run:
     ```bash
     docker-compose down
     ```

9. **Customizing the Setup**:
   - You can modify the `docker-compose.yml` file to change ports, environment variables, or other configurations as needed.

This setup ensures that the application is portable and can be easily deployed in any environment that supports Docker.
