const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const SECRET_KEY = process.env.SECRET_KEY;

// Criar novo usuário
exports.createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const hashedPassword = bcrypt.hashSync(senha, 8);
        const user = await User.create({ nome, email, senha: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

// Listar todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Errrro ao listar usuários', error });
    }
};

// Obter usuário por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter usuário pelo id', error });
    }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.nome = nome || user.nome;
        user.email = email || user.email;
        if (senha) user.senha = bcrypt.hashSync(senha, 8);

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Login e gerar token JWT
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const passwordIsValid = bcrypt.compareSync(senha, user.senha);
        if (!passwordIsValid) return res.status(401).json({ message: 'senha inválida' });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao logar', error });
    }
};
