import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Branches from '../infra/typeorm/entities/Branches';
import IBranchRepository from '../repositories/IBranchRepository';
import ICreateBranchDTO from '../dtos/ICreateBranchDTO';



@injectable()
class CreateBranchService {
  constructor(
    @inject('BranchRepository')
    private branchRepository: IBranchRepository,
  ) {}

  public async execute({
    name,
    total_staff
  }: ICreateBranchDTO): Promise<Branches> {

    const checkBranchNameAlreadyUsed = await this.branchRepository.findBranchByName(name)
    
    if(checkBranchNameAlreadyUsed){
      throw new AppError('This name has already used');
    }
   
    const branch = await this.branchRepository.createBranch({
      name,
      total_staff
    });

    return branch;
  }
}

export default CreateBranchService;
