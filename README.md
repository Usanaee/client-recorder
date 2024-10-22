# Client Recorder

Client Recorder is a full-stack MERN application for efficiently managing client records, built with MongoDB, Express, React, and Node.js. The app enables users to easily create, view, update, and delete client data while providing a seamless UI and responsive design. 


## Features 🥇

- **Client Management**: Create, read, update, and delete (CRUD) operations for managing client records.
- **Search Functionality**: Quickly find client records based on name or company details.
- **User Authentication**: Secure user registration and login using JWT tokens for access control.
- **Responsive Design**: Fully responsive layout, optimized for both desktop and mobile views.
- **Data Validation**: Ensures valid inputs for all client data fields to prevent errors.
  
  
## Tech Stack 🛠️

- **Frontend**: React, React Router, Axios, Tailwind CSS for UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose for schema modeling
- **Authentication**: JWT (JSON Web Token) for user authentication
- **File Upload**: Multer for handling file uploads (e.g., client images)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js and npm installed
- MongoDB set up locally or with MongoDB Atlas

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Usanaee/client-recorder.git
   cd client-recorder

2. Install dependencies for both frontend and backend:
```bash
cd client-recorder/backend
npm install
cd ../client
npm install
```

3. Set up environment variables:
- Create a .env file in the backend directory.
- Add the following variables:
```bash
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
PORT=5000

```

### Start the development servers:

```bash
cd backend
npm run dev
cd ../client
npm start

```





## Authors

- Repository Made By [@Usama Naeem](https://github.com/Usanaee)

