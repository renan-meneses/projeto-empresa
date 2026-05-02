import { Contract } from '../entities/Contract'

export interface IContractRepository {
  create(contract: Contract): Promise<Contract>
  findById(id: string): Promise<Contract | null>
  findByClientId(clientId: string): Promise<Contract[]>
  findAll(): Promise<Contract[]>
  update(contract: Contract): Promise<Contract>
  delete(id: string): Promise<void>
}
