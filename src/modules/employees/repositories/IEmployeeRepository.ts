import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import Employee from '../infra/typeorm/entities/Employees';

export default interface IEmployeeRepository {
  findAllEmployees(branch_id: string): Promise<Employee[] | undefined>;
  findEmployeeByName(
    branch_id: string,
    name: string,
  ): Promise<Employee[] | undefined>;

  findEmployeeById(
    branch_id: string,
    id: string,
  ): Promise<Employee | undefined>;

  createEmployee(data: ICreateEmployeeDTO): Promise<Employee>;
  saveEmployee(data: ICreateEmployeeDTO): Promise<Employee>;

  removeEmployee(data: Employee): Promise<void>;
}
