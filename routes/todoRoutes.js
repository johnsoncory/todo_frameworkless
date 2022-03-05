import { addNewTodo, getTodos } from "../controllers/TodoController.js";

const routes = (app) => {
  app
    .route("/api/todos")
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getTodos)

    // POST endpoint
    .post(addNewTodo);
};

export default routes;
