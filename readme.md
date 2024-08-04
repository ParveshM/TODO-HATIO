# TODO-HATIO

TODO-HATIO is a versatile task management application designed to help you organize and manage your projects efficiently. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this application provides a user-friendly interface for creating, updating, and tracking todos within various projects.

##### Technologies Used 🛠️

- **Node.js**: 🌲
- **React.js**: ⚛️
- **Express.js**: 🌐
- **TypeScript**: 📝
- **MongoDB**: 🗄️
- **Tailwind CSS**: 💨
- **GitHub REST API**: 🐙
- **JWT (JSON Web Tokens)**: 🔑

## Getting Started

Follow these steps to run this application in your system locally:

1. Clone the repository:

```bash
git clone https://github.com/ParveshM/TODO-HATIO.git
```

2. Navigate to the project directory:

```bash
cd client
cd server
```

3. Install dependencies:

```bash
npm install
```

4. Ignite the app:

```bash
npm run dev - client
npm run dev - server
```

5. Open your browser and go to `http://localhost:5713` to access the application.

## Configuration

#### 1. Client

Create a .env file in client with the following variables.

```bash
⚠️ VITE_GITHUB_AUTH_TOKEN=your_github_auth_token (Mandatory) ⚠️

```

To get the Auth_token for interacting with Github Rest Api's refer this document [Link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#fine-grained-personal-access-tokens) .

#### 2. Server

Create a .env file in server with the following variables.

```bash
PORT
MONGO_URL
JWT_SECRET
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
