import ICreateBanchDTO from '../dtos/ICreateBranchDTO';
import Branch from '../infra/typeorm/entities/Branches';

export default interface IBranchRepository {
  findAllBranches():Promise<Branch[] | undefined>;
  findBranchById(id:string):Promise <Branch | undefined>;
  findBranchByName(name:string):Promise <Branch | undefined>;


  createBranch(data:ICreateBanchDTO):Promise<Branch>;
  saveBranch(data:ICreateBanchDTO):Promise<Branch>

  removeBranch(data:Branch):Promise<void>;
}