import { Router } from 'express';
import { RacaHabilidadeController } from '../controllers/tabelas_relacionamento/racahabilidade.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const racaHabilidadeController = new RacaHabilidadeController();

/**
 * @swagger
 * tags:
 *   name: RacaHabilidades
 *   description: Gerenciamento de relacionamentos entre raças e habilidades T20
 */

/**
 * @swagger
 * /raca-habilidades:
 *   post:
 *     summary: Cria um relacionamento entre raça e habilidade
 *     tags: [RacaHabilidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRacaHabilidadeDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaHabilidadeResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Raça ou habilidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, racaHabilidadeController.createRacaHabilidade.bind(racaHabilidadeController));

/**
 * @swagger
 * /raca-habilidades:
 *   get:
 *     summary: Retorna todos os relacionamentos raça-habilidade
 *     tags: [RacaHabilidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de relacionamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RacaHabilidadeResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, racaHabilidadeController.getAllRacaHabilidades.bind(racaHabilidadeController));

/**
 * @swagger
 * /raca-habilidades/{id}:
 *   get:
 *     summary: Retorna um relacionamento raça-habilidade pelo ID
 *     tags: [RacaHabilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do relacionamento
 *     responses:
 *       200:
 *         description: Dados do relacionamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaHabilidadeResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, racaHabilidadeController.getRacaHabilidadeById.bind(racaHabilidadeController));

/**
 * @swagger
 * /raca-habilidades/{id}:
 *   put:
 *     summary: Atualiza um relacionamento raça-habilidade
 *     tags: [RacaHabilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do relacionamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRacaHabilidadeDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaHabilidadeResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, raça ou habilidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, racaHabilidadeController.updateRacaHabilidade.bind(racaHabilidadeController));

/**
 * @swagger
 * /raca-habilidades/{id}:
 *   delete:
 *     summary: Remove um relacionamento raça-habilidade
 *     tags: [RacaHabilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do relacionamento
 *     responses:
 *       204:
 *         description: Relacionamento removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, racaHabilidadeController.deleteRacaHabilidade.bind(racaHabilidadeController));

export default router;