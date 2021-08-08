import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const foundedUser:User = this.usersRepository.findByEmail(email);
    if(!foundedUser){
      throw new Error("User with" + foundedUser.email + " already exists !");
    }
    const newUser:User = this.usersRepository.create({email,name});
    return newUser;
  }
}

export { CreateUserUseCase };
