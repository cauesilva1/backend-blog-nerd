import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";


export async function post (req: Request, res: Response) {

    try{
        const { id, title, content } = req.body;

        const currentUtcDateTime = new Date();

        const newComment = await prisma.post.create({
        data: {
            title,
            content,
            userId: id,
            timestamp: currentUtcDateTime,
        },
        });

        res.status(201).json(newComment);

    } catch (error) {
        res.status(500).json({ error: "Erro ao criar comentário" });
    }
}

export async function posts(req: Request, res: Response) {

    try {
        const getPosts = await prisma.post.findMany({
            select: {
              id: true,
              title: true,
              content: true,
              timestamp: true,
              user: {
                select:{
                  id: true,
                  user: true,
                  photo: true
                }
              }
            }
          })
        
          console.log(getPosts)
          res.status(200).json(getPosts);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter posts" });
    }

}