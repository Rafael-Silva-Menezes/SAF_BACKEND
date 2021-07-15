import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BranchController from '../controllers/BranchController';

const branchesRouter = Router();
const branchController = new BranchController();

branchesRouter.use(ensureAuthenticated);

branchesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  branchController.create,
);

branchesRouter.get('/index', branchController.index);

branchesRouter.get(
  '/show/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  branchController.show,
);

branchesRouter.put('/update/:id', branchController.update);

branchesRouter.delete(
  '/delete/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  branchController.remove,
);

export default branchesRouter;
