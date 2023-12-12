# Deploying/Using Locally

Steps: 
1. Clone via `git clone https://github.com/farooqashar/bioverse.git`
2. CD into bioverse
3. Create a new file in the `bioverse` root directory called `.env.local`. Add the following into the file: `MONGODB_URI="mongodb+srv://ashar:ashar@cluster0.7op2yre.mongodb.net/support?retryWrites=true&w=majority"`
4. Run `yarn install` (installing frontend packages)
5. cd into `backend`
6. Run `npm install` (installing backend packages)
7. Open two terminals
8. In the `bioverse` directory, run `npm run dev` to start the frontend server
9. In the `bioverse/backend` directory, run `node index.js` to start the backend server
10. Go to `localhost:3000` or the equivalent to see the frontend and use the web application.


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
