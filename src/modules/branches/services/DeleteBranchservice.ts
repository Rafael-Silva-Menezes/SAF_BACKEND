import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBranchRepository from '../repositories/IBranchRepository';
import IShowBranchDTO from '../dtos/IShowBranchDTO';

@injectable()
class ShowBranchService {
  constructor(
    @inject('BranchRepository')
    private branchRepository: IBranchRepository,
  ) {}

  public async execute({ id }: IShowBranchDTO): Promise<void> {
    const branch = await this.branchRepository.findBranchById(id);

    if (!branch) {
      throw new AppError('This branch not exists');
    }

    await this.branchRepository.removeBranch(branch);
  }
}

export default ShowBranchService;
