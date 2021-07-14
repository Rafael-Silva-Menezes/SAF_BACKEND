import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBranchRepository from '../repositories/IBranchRepository';
import IShowBranchDTO from '../dtos/IShowBranchDTO';
import IEmployeeRepository from '../../employees/repositories/IEmployeeRepository';
import Branches from '../infra/typeorm/entities/Branches';

@injectable()
class ShowBranchService {
  constructor(
    @inject('BranchRepository')
    private branchRepository: IBranchRepository,

    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute({ id }: IShowBranchDTO): Promise<Branches> {
    const branch = await this.branchRepository.findBranchById(id);

    if (!branch) {
      throw new AppError('This branch not exists');
    }

    const employees = await this.employeeRepository.findAllEmployees(branch.id);

    const total = employees ? employees.length : 0;
    console.log(total);

    branch.total_staff = total;

    await this.branchRepository.saveBranch(branch);

    return branch;
  }
}

export default ShowBranchService;
