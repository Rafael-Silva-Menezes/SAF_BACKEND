import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEmployeeRepository from '../repositories/IEmployeeRepository';
import IShowEmployeeDTO from '../dtos/IShowEmployeeDTO';

@injectable()
class DeleteEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute({ branch_id, id }: IShowEmployeeDTO): Promise<void> {
    const employee = await this.employeeRepository.findEmployeeById(
      branch_id,
      id,
    );

    if (!employee) {
      throw new AppError('Employee not register');
    }

    await this.employeeRepository.removeEmployee(employee);
  }
}

export default DeleteEmployeeService;
