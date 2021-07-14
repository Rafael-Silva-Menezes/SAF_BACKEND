import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Employees from '../infra/typeorm/entities/Employees';
import IEmployeeRepository from '../repositories/IEmployeeRepository';
import IShowEmployeeDTO from '../dtos/IShowEmployeeDTO';

@injectable()
class ShowEmployeesService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute({
    branch_id,
    id,
  }: IShowEmployeeDTO): Promise<Employees> {
    const employee = await this.employeeRepository.findEmployeeById(
      branch_id,
      id,
    );

    if (!employee) {
      throw new AppError('Employee not register');
    }

    return employee;
  }
}

export default ShowEmployeesService;
