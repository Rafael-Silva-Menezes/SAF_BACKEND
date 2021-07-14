import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IBranchRepository from '@modules/branches/repositories/IBranchRepository';
import BranchRepository from '@modules/branches/infra/typeorm/repositories/BranchRepository';

import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import EmployeeRepository from '@modules/employees/infra/typeorm/repositories/EmployeeRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';




container.registerSingleton<IBranchRepository>(
  'BranchRepository',
  BranchRepository,
);

container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository,
);


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

