import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Employees from '../infra/typeorm/entities/Employees';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

import IBranchRepository from '../../branches/repositories/IBranchRepository';
import IUpdateEmployeeDTO from '../dtos/IUpdateEmployeeDTO';

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
    branch_name,
    branch_id,
    id,
  }: IUpdateEmployeeDTO): Promise<Employees> {
    const employee = await this.employeeRepository.findEmployeeById(
      branch_id,
      id,
    );

    if (!employee) {
      throw new AppError('Employee not exist');
    }

    console.log(branch_name);

    const newBranchId = await this.branchRepository.findBranchByName(
      branch_name,
    );

    if (!newBranchId) {
      throw new AppError('Error');
    }

    employee.name = name;
    employee.branch_name = branch_name;
    employee.branch_id = newBranchId.id;

    await this.employeeRepository.saveEmployee(employee);

    return employee;
  }
}

export default CreateEmployeeService;
