import express from 'express';
import cors from 'cors';
import { setupSwagger } from './config/swagger';
import { AppDataSource } from './config/database';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API de Usuários está funcionando!');
});

// Rotas
app.use('/', routes);

// Inicialização do servidor
AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    });

export default app;