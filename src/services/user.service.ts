import { User } from '@src/models/user.model'
import { getRepository } from 'typeorm'

export const getAllUsersFromDatabase = async (): Promise<User[]> => {
  return await getRepository(User).find()
}
