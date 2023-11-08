"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.post = void 0;
const prisma_1 = require("../../lib/prisma");
function post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, title, content } = req.body;
            const currentUtcDateTime = new Date();
            const newComment = yield prisma_1.prisma.post.create({
                data: {
                    title,
                    content,
                    userId: id,
                    timestamp: currentUtcDateTime,
                },
            });
            res.status(201).json(newComment);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar comentário" });
        }
    });
}
exports.post = post;
function posts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getPosts = yield prisma_1.prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    timestamp: true,
                    user: {
                        select: {
                            id: true,
                            user: true,
                            photo: true
                        }
                    }
                }
            });
            console.log(getPosts);
            res.status(200).json(getPosts);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter posts" });
        }
    });
}
exports.posts = posts;
