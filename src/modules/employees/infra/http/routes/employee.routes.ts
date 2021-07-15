import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EmployeeController from '../controllers/EmployeeController';

const employeesRouter = Router();
const employeesController = new EmployeeController();

employeesRouter.use(ensureAuthenticated);

employeesRouter.post(
  '/create/:branch_id',
  celebrate({
    [Segments.PARAMS]: {
      branch_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  employeesController.create,
);

employeesRouter.get(
  '/show/:branch_id/:id',
  celebrate({
    [Segments.PARAMS]: {
      branch_id: Joi.string().required(),
      id: Joi.string().required(),
    },
  }),
  employeesController.show,
);

employeesRouter.get(
  '/index/:branch_id',
  celebrate({
    [Segments.PARAMS]: {
      branch_id: Joi.string().required(),
    },
  }),
  employeesController.index,
);

employeesRouter.put(
  '/update/:branch_id/:id',
  celebrate({
    [Segments.PARAMS]: {
      branch_id: Joi.string().required(),
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      branch_name: Joi.string().required(),
    },
  }),
  employeesController.update,
);

employeesRouter.delete(
  '/delete/:branch_id/:id',
  celebrate({
    [Segments.PARAMS]: {
      branch_id: Joi.string().required(),
      id: Joi.string().required(),
    },
  }),
  employeesController.remove,
);

export default employeesRouter;
