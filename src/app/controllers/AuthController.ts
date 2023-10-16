require('dotenv').config()
import { Request, Response } from 'express'
import User from '../entity/User'
import { AppDataSource } from '../../database/connect'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'


class AuthController {

    async authenticate(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(User)

        const { email, password } = req.body

        const user = await repository.findOne({ where: { email } })
        
        if(!user){
            return res.status(401).json({message: "Erro de autenticação"})
        }

        const isValidPassword = await bcrypt.compare(password, user.password!)

        if(!isValidPassword){
            return res.status(401).json({message: "Erro de autenticação"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: '1d'})

        delete user.password
        return res.status(200).json({
            user,
            token
        })
    }

 
}

export default new AuthController()