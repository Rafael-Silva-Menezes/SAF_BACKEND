import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import ShowEmployeesService from '@modules/employees/services/ShowEmployeesService';
import ListEmployeesService from '@modules/employees/services/ListEmployeesService';
import DeleteEmployeeService from '@modules/employees/services/DeleteEmployeeService';
import EditEmployeeService from '@modules/employees/services/EditEmployeeService';

export default class EmployeeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { branch_id } = request.params;
    const { name } = request.body;

    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      name,
      branch_id,
    });

    return response.json(employee);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { branch_id, id } = request.params;

    const showEmployee = container.resolve(ShowEmployeesService);

    const employee = await showEmployee.execute({
      branch_id,
      id,
    });

    return response.json(employee);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { branch_id } = request.params;

    const listEmployees = container.resolve(ListEmployeesService);

    const employees = await listEmployees.execute({
      branch_id,
    });

    return response.json(employees);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { branch_id, id } = request.params;
    const { name, branch_name } = request.body;

    const updateEmployees = container.resolve(EditEmployeeService);

    const employees = await updateEmployees.execute({
      branch_id,
      id,
      branch_name,
      name,
    });

    return response.json(employees);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { branch_id, id } = request.params;

    const listEmployees = container.resolve(DeleteEmployeeService);

    await listEmployees.execute({
      branch_id,
      id,
    });

    return response.json({ message: 'Employee Deleted' });
  }
}
