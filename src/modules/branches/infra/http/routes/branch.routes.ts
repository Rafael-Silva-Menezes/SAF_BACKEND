import { Router } from 'express';

import BranchController from '../controllers/BranchController';
import { celebrate, Segments, Joi } from 'celebrate';


const branchesRouter = Router();
const branchController = new BranchController();

branchesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  branchController.create,
);

export default branchesRouter;
