import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBranchService from '@modules/branches/services/CreateBranchService';
import ShowBranchService from '@modules/branches/services/ShowBranchService';
import ListBranchesService from '@modules/branches/services/ListBranchesService';
import UpdateBranchService from '@modules/branches/services/UpdateBranchService';
import DeleteBranchservice from '@modules/branches/services/DeleteBranchservice';

export default class BranchController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createBranch = container.resolve(CreateBranchService);

    const branch = await createBranch.execute({
      name,
      total_staff: 0,
    });

    return response.json(branch);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBranch = container.resolve(ShowBranchService);

    const branch = await showBranch.execute({
      id,
    });

    return response.json(branch);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listBranches = container.resolve(ListBranchesService);

    const branches = await listBranches.execute();

    return response.json(branches);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateBranch = container.resolve(UpdateBranchService);

    const branch = await updateBranch.execute({
      id,
      name,
    });

    return response.json(branch);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteBranch = container.resolve(DeleteBranchservice);

    await deleteBranch.execute({
      id,
    });

    return response.json({ message: 'Branch deleted' });
  }
}
