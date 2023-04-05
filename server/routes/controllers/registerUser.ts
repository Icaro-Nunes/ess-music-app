import { Request, Response } from 'express';
import fs = require('fs');
import getJsonDatabase from '../utils/jsonDatabase'
import { hashPassword } from '../utils/bcryptUtils'
import * as uuid from 'uuid';

export const registerUser = async (req: Request, res: Response) => {
    const hashedPassword = await hashPassword(req.body.password)
    const username = req.body.name
    const email = req.body.email
    const password = hashedPassword

    // Valida se o email possui um "@"
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return res.status(400).send('Email inválido.')
    }

    const newUser = {
        id: uuid.v4(),
        name: username,
        email: email,
        password: password
    }

    // Cria um handle para o arquivo json de banco de dados
    getJsonDatabase((err: any, jsonDatabase: any) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo JSON de usuários.')
        }

        // Verifica se o username já está em uso
        const usernameExists = jsonDatabase.some((user: { name: any }) => user.name === username)
        if (usernameExists) {
            return res.status(400).send('Este nome de usuário já está em uso.')
        }

        // Adiciona o novo usuário
        jsonDatabase.push(newUser)

        fs.writeFile('users.json', JSON.stringify(jsonDatabase), function (err: any) {
            if (err) {
                console.error(err)
                return res.status(500).send('Erro ao gravar no arquivo JSON de usuários.')
            }
            res.send('Usuário registrado com sucesso!')
        })
    })
}
