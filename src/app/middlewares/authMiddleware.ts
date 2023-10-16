require('dotenv').config()

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: number, iat: number, exp: number
}



export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: "Erro de autorização" })
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string)

        const { id } = data as TokenPayload

        req.userId = id
        return next()
    } catch {
        return res.status(401).json({ message: "Erro de autorização" })
    }
}