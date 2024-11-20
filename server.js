import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient(); // Inicializando o Prisma Client
app.use(express.json());

// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { name, email, age, address } = req.body; // Incluindo address

        // Cria um novo usuário no banco de dados
        const newUser = await prisma.user.create({
            data: {
                email:    req.body.email,   
                name:   req.body.name,
                address:  req.body.Address
        }
        });
 
        res.status(201).json({ message: 'Usuário adicionado com sucesso', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar usuário', error: error.message });
    }
});


// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Busca todos os usuários no banco de dados
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});


// Rota para criar um novo usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { name, email, age, address } = req.body; // Incluindo address

        // Cria um novo usuário no banco de dados
        const newUser = await prisma.user.update({
            where: {
                id: req.params.id 
            },
            data: {
                email:    req.body.email,   
                name:   req.body.name,
                address:  req.body.Address
        }
        }); 
 
        res.status(201).json({ message: 'Usuário alterado com sucesso', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao alterar usuário', error: error.message });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        // Exclui o usuário pelo ID
        const deletedUser = await prisma.user.delete({
            where: {
                id: String(req.params.id) // Certifique-se de passar como número
            }
        });

        // Retorna mensagem de sucesso
        res.status(200).json({ message: `Usuário ${deletedUser.name} foi excluído com sucesso.` });
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
        }
    }
});



app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000'); 
}); 
