import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    
    const foundedUser = this.usersRepository.findById(user_id);
    if(!foundedUser){
      throw new Error("User with id:" + user_id + " not found");
    }
    return foundedUser;
  }
}

export { ShowUserProfileUseCase };
