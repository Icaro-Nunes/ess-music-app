import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        maxAge: 0
    })

    res.send({
        message: 'logout successful'
    })
}