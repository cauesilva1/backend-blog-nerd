import express, { Router } from "express";
import { createUser, putUser, login} from "./app/user";
import {post, posts} from "./app/post"
export const router = Router()
const app = express();
app.use(express.json());

//User
router.post("/user",createUser )
router.post("/putUsser", putUser )
router.post("/login", login )


//posts
router.post("/post", post)
router.get("/posts", posts)