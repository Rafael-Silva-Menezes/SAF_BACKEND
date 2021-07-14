import { getRepository, Repository } from 'typeorm';

import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';
import Employees from '../entities/Employees';

class EmployeeRepository implements IEmployeeRepository {
  private ormRepository: Repository<Employees>;

  constructor() {
    this.ormRepository = getRepository(Employees);
  }

  public async findEmployeeById(
    branch_id: string,
    id: string,
  ): Promise<Employees | undefined> {
    const employee = await this.ormRepository.findOne({
      where: { branch_id, id },
    });

    return employee;
  }

  public async findEmployeeByName(
    branch_id: string,

    name: string,
  ): Promise<Employees[] | undefined> {
    const employee = await this.ormRepository.find({
      where: { branch_id, name },
    });

    return employee;
  }

  public async findAllEmployees(
    branch_id: string,
  ): Promise<Employees[] | undefined> {
    const employees = await this.ormRepository.find({
      where: { branch_id },
    });

    return employees;
  }

  public async createEmployee(data: ICreateEmployeeDTO): Promise<Employees> {
    const employee = this.ormRepository.create(data);

    await this.ormRepository.save(employee);

    return employee;
  }

  public async saveEmployee(data: Employees): Promise<Employees> {
    return this.ormRepository.save(data);
  }

  public async removeEmployee(data: Employees): Promise<void> {
    await this.ormRepository.remove(data);
  }
}

export default EmployeeRepository;
