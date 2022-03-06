import mongoose from "mongoose";
import { TodoSchema } from "../models/Todo.js";

const Todo = mongoose.model("Todo", TodoSchema);

export const addNewTodo = (req, res) => {
  let newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      res.send(err);
    }
    res.json(todo);
  });
};

export const getTodos = (req, res) => {
  Todo.find({}, (err, todo) => {
    if (err) {
      res.send(err);
    }
    res.json(todo);
  });
};

export const updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(
    { _id: req.params.todoId },
    req.body,
    { new: false },
    (err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    }
  );
};

export const deleteTodo = (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.todoId }, (err, todo) => {
    if (err) {
      res.send(err);
    }
    console.log(`Todo deleted: ${todo}`);
    res.json(todo);
  });
};
