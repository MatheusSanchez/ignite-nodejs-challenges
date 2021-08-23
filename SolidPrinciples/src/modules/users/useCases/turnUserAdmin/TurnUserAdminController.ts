import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    try{
      const {user_id} = request.params;
      const newAdminUser = this.turnUserAdminUseCase.execute({user_id: user_id});
      return response.status(201).json(newAdminUser);
    }catch(err){
      return response.status(400).json({error: err});
    }
    
  }
}

export { TurnUserAdminController };
