import {
  addNewTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/TodoController.js";

const routes = (app) => {
  //GET endpoint
  app.route("/api/todos").get((req, res, next) => {
    // middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getTodos);

  // POST endpoint
  app.route("/api/todos/add").post(addNewTodo);

  //PUT endpoint
  app.route("/api/todos/update/:todoId").put(updateTodo);

  app.route("/api/todos/delete/:todoId").delete(deleteTodo);
};

export default routes;
