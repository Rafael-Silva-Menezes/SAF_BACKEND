import { getRepository, Repository } from 'typeorm';

import IBranchRepository from '@modules/branches/repositories/IBranchRepository';
import ICreateBranchDTO from '@modules/branches/dtos/ICreateBranchDTO';
import Branches from '../entities/Branches';

class BranchRepository implements IBranchRepository {
  private ormRepository: Repository<Branches>;

  constructor() {
    this.ormRepository = getRepository(Branches);
  }

  public async findBranchById(id: string): Promise<Branches | undefined> {
    const branch = await this.ormRepository.findOne({
      where: { id },
    });

    return branch;
  }

  public async findBranchByName(name: string): Promise<Branches | undefined> {
    const branch = await this.ormRepository.findOne({
      where: { name },
    });

    return branch;
  }

  public async findAllBranches(): Promise<Branches[] | undefined> {
    const branches = await this.ormRepository.find();

    return branches;
  }

  public async createBranch(data: ICreateBranchDTO): Promise<Branches> {
    const branches = this.ormRepository.create(data);

    await this.ormRepository.save(branches);

    return branches;
  }

  public async saveBranch(data: Branches): Promise<Branches> {
    return this.ormRepository.save(data);
  }

  public async removeBranch(data: Branches): Promise<void> {
    await this.ormRepository.remove(data);
  }
}

export default BranchRepository;
