import express from "express";
import { Task } from "./task-model.js";
import {Project} from '../project/project-model.js';

const router = express.Router();
const BASE_PATH = "/api/tasks";

router
  .route(BASE_PATH)
  // find all
  .get((req, res, next) => {
    const { projectId } = req.query;
    Task.find({ projectId })
      .lean()
      .then((tasks) => res.send(tasks))
      .catch(next);
  })
  // create new
  .post((req, res, next) => {
    const clientId = req.headers['client-id'];
    new Task(req.body).save({ senderId: clientId })
      .then((task) => res.send(task))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/search`)
  // search
  .post((req, res, next) => {
    Task.find({ notes: { $regex: req.body.query } })
      .lean()
      .then((tasks) => res.send(tasks))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/:_id`)
  // get one
  .get((req, res, next) => {
    Task.findById(req.params._id)
      .lean()
      .orFail()
      .then((task) => res.send(task))
      .catch(next);
  })
  // update
  .put((req, res, next) => {
    const clientId = req.headers['client-id'];
    Task.findByIdAndUpdate(req.params._id, req.body, { new: true, senderId: clientId })
      .lean()
      .orFail()
      .then((task) => res.send(task))
      .catch(next);
  })
  // delete
  .delete((req, res, next) => {
    const clientId = req.headers['client-id'];
    Task.findByIdAndDelete(req.params._id, {senderId: clientId})
      .lean()
      .orFail()
      .then(() => res.send(req.params))
      .catch(next);
  });

export default router;
