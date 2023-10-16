import { Request, Response } from 'express'
import User from '../entity/User'
import { AppDataSource } from '../../database/connect'

class UserController {

    async store(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(User)

        const { email, password } = req.body

        const userExists = await repository.findOne({ where: { email } })

        if (userExists!) {
            return res.status(409).json({message: "E-mail already in use"})
        }

        const user = await repository.create({ email, password })
        await repository.save(user).then(response => console.log(response))

        return res.status(200).json({user})
    }

    async getAll(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()

        res.json({users})
    }
}

export default new UserController()