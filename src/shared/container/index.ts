import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IBranchRepository from '@modules/branches/repositories/IBranchRepository';
import BranchRepository from '@modules/branches/infra/typeorm/repositories/BranchRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


container.registerSingleton<IBranchRepository>(
  'BranchRepository',
  BranchRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

