import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Employees from '../infra/typeorm/entities/Employees';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

import IBranchRepository from '../../branches/repositories/IBranchRepository';
import IRegisterEmployeeDTO from '../dtos/IRegisterEmployeeDTO';

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,

    @inject('BranchRepository')
    private branchRepository: IBranchRepository,
  ) {}

  public async execute({
    name,
    branch_id,
  }: IRegisterEmployeeDTO): Promise<Employees> {
    const branch = await this.branchRepository.findBranchById(branch_id);

    if (!branch) {
      throw new AppError('This branch has not register');
    }

    branch.total_staff += 1;

    await this.branchRepository.saveBranch(branch);

    const employee = await this.employeeRepository.createEmployee({
      name,
      branch_name: branch.name,
      branch_id,
    });

    return employee;
  }
}

export default CreateEmployeeService;
