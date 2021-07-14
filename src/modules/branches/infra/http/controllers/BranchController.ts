import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBranchService from '@modules/branches/services/CreateBranchService';

export default class BranchController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createBranch = container.resolve(CreateBranchService);

    const branch = await createBranch.execute({
      name,
      total_staff: 0
    });

    return response.json(branch);
  }
}
