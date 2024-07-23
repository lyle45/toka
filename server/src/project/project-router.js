import express from 'express';
import { Project } from './project-model.js';

const router = express.Router();
const BASE_PATH = '/api/projects';

router
  .route(BASE_PATH)
  // find all
  .get((req, res, next) => {
    Project.find()
      .lean()
      .then((projects) => res.send(projects))
      .catch(next);
  })
  // create new
  .post((req, res, next) => {
    const clientId = req.headers['client-id'];
    new Project(req.body).save({ senderId: clientId })
      .then((project) => res.send(project))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/search`)
  // search
  .post((req, res, next) => {
    Project.find({ name: { $regex: req.body.query } })
      .lean()
      .then((projects) => res.send(projects))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/:_id`)
  // get one
  .get((req, res, next) => {
    Project.findById(req.params._id)
      .lean()
      .orFail()
      .then((project) => res.send(project))
      .catch(next);
  })
  // update
  .put((req, res, next) => {
    const clientId = req.headers['client-id'];
    Project.findByIdAndUpdate(req.params._id, req.body, { new: true, sender: clientId })
      .lean()
      .orFail()
      .then((project) => res.send(project))
      .catch(next);
  })
  // delete
  .delete((req, res, next) => {
    const clientId = req.headers['client-id'];
    Project.findByIdAndDelete(req.params._id, { sender: clientId })
      .lean()
      .orFail()
      .then(() => res.send(req.params))
      .catch(next);
  });

export default router;
