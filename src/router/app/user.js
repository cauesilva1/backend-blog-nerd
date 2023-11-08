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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.putUser = exports.createUser = void 0;
const prisma_1 = require("../../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, password, email } = req.body;
            const saltRounds = 16;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const Createuser = yield prisma_1.prisma.user.create({
                data: {
                    user,
                    password: hashedPassword,
                    email,
                },
            });
            res.status(201).json({ sucess: "Usuário criado com sucesso" });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    });
}
exports.createUser = createUser;
function putUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, user, email, photo } = req.body;
            const updateUser = yield prisma_1.prisma.user.update({
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
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    });
}
exports.putUser = putUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, password } = req.body;
            function Buscaruser(username, password) {
                return __awaiter(this, void 0, void 0, function* () {
                    const FindUser = yield prisma_1.prisma.user.findFirst({
                        where: {
                            user: username,
                        },
                    });
                    if (!user) {
                        throw new Error("Usuário não encontrado");
                    }
                    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                    if (!passwordMatch) {
                        throw new Error("Senha incorreta");
                    }
                    return Object.assign(Object.assign({}, user), { name: user.user });
                });
            }
            res
                .status(200)
                .json({ message: "Login bem-sucedido", user: Buscaruser(user, password) });
        }
        catch (error) {
            res.status(401).json({ error: "Erro ao fazer login" });
        }
    });
}
exports.login = login;
