import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Branches from '../infra/typeorm/entities/Branches';
import IBranchRepository from '../repositories/IBranchRepository';
import IUpdateBranch from '../dtos/IUpdateBranch';

@injectable()
class CreateBranchService {
  constructor(
    @inject('BranchRepository')
    private branchRepository: IBranchRepository,
  ) {}

  public async execute({ id, name }: IUpdateBranch): Promise<Branches> {
    const branch = await this.branchRepository.findBranchById(id);

    if (!branch) {
      throw new AppError('Branch not exist');
    }

    branch.name = name;
    console.log(branch);

    await this.branchRepository.saveBranch(branch);

    return branch;
  }
}

export default CreateBranchService;
