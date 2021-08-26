import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const foundedUser:User = this.usersRepository.findById(user_id);
    if(!foundedUser){
      
      throw new Error("User with id:" + user_id + " not found !");
    }
    if(foundedUser.admin == false){
      throw new Error("User with id:" + foundedUser.id + " is not admin !");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
