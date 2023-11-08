import { Request, Response } from "express";
import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {

  try {
    
    const { user, password, email } = req.body;
    
    const existentUser = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if(existentUser) {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    const saltRounds = 16;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const Createuser = await prisma.user.create({
      data: {
        user,
        password: hashedPassword,
        email,
      },
    });

    res.status(201).json({ sucess: "Usuário criado com sucesso" });

  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

export async function putUser(req: Request, res: Response) {

  try {
  const { id, user, email, photo } = req.body;
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      user,
      email,
      photo,
    },
  });

  res
    .status(200)
    .json({ message: "Usuário atualizado com sucesso", user: updateUser }); 

  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}

export async function login(req: Request, res: Response) {

  try {
    const { user, password } = req.body;

    async function Buscaruser(username: string, password: string) {
  
    const FindUser = await prisma.user.findFirst({
      where: {
        user: username,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    return {
      ...user, name: user.user
    };

  }


    res
      .status(200)
      .json({ message: "Login bem-sucedido", user: Buscaruser(user, password) });

  } catch (error) {
     res.status(401).json({ error: "Erro ao fazer login" });
  }

}
