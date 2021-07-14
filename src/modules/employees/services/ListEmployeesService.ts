import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Employees from '../infra/typeorm/entities/Employees';
import IEmployeeRepository from '../repositories/IEmployeeRepository';
import IListEmployeesDTO from '../dtos/IListEmployeesDTO';

@injectable()
class ListEmployeesService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute({ branch_id }: IListEmployeesDTO): Promise<Employees[]> {
    const employees = await this.employeeRepository.findAllEmployees(branch_id);

    if (!employees) {
      throw new AppError('Branch does not have employees');
    }

    return employees;
  }
}

export default ListEmployeesService;
