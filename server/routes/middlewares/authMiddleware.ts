import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken'
import getJsonDatabase from '../utils/jsonDatabase';

interface User {
    id: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies['jwt']

    if (!cookie) {
        return res.status(401).send('Usuário não autenticado.');
    }

    try {
        const claims = jwt.verify(cookie, 'minha_chave_secreta') as JwtPayload;
        if (!claims) {
            return res.status(401).send('Usuário não autenticado.');
        }

        // Cria um handle para o arquivo json de banco de dados
        getJsonDatabase((err: any, jsonDatabase: any) => {
            if (err) {
                return res.status(500).send('Erro ao ler o arquivo JSON de usuários.');
            }

            // Busca o usuário pelo id
            const user = jsonDatabase.find((user: { id: any }) => user.id === claims._id);
            if (!user) {
                return res.status(401).send('Usuário não autenticado.');
            }

            req.user = user;
            next();
        });

    }
    catch (error) {
        return res.status(401).send('Usuário não autenticado.');
    }
}