import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBranchRepository from '../repositories/IBranchRepository';
import Branches from '../infra/typeorm/entities/Branches';

@injectable()
class ListBranchesService {
  constructor(
    @inject('BranchRepository')
    private branchRepository: IBranchRepository,
  ) {}

  public async execute(): Promise<Branches[]> {
    const branch = await this.branchRepository.findAllBranches();

    if (!branch) {
      throw new AppError('This no have branches registers');
    }

    return branch;
  }
}

export default ListBranchesService;
