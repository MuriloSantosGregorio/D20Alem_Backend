import { Router } from 'express';
import { DeusRacaController } from '../controllers/tabelas_relacionamento/deusraca.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const deusRacaController = new DeusRacaController();

/**
 * @swagger
 * tags:
 *   name: DeusRacas
 *   description: Gerenciamento de relacionamentos entre deuses e raças T20
 */

/**
 * @swagger
 * /deus-racas:
 *   post:
 *     summary: Cria um relacionamento entre deus e raça
 *     tags: [DeusRacas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeusRacaDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeusRacaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Deus ou raça não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, deusRacaController.createDeusRaca.bind(deusRacaController));

/**
 * @swagger
 * /deus-racas:
 *   get:
 *     summary: Retorna todos os relacionamentos deus-raça
 *     tags: [DeusRacas]
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
 *                 $ref: '#/components/schemas/DeusRacaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, deusRacaController.getAllDeusRacas.bind(deusRacaController));

/**
 * @swagger
 * /deus-racas/{id}:
 *   get:
 *     summary: Retorna um relacionamento deus-raça pelo ID
 *     tags: [DeusRacas]
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
 *               $ref: '#/components/schemas/DeusRacaResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, deusRacaController.getDeusRacaById.bind(deusRacaController));

/**
 * @swagger
 * /deus-racas/{id}:
 *   put:
 *     summary: Atualiza um relacionamento deus-raça
 *     tags: [DeusRacas]
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
 *             $ref: '#/components/schemas/UpdateDeusRacaDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeusRacaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, deus ou raça não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, deusRacaController.updateDeusRaca.bind(deusRacaController));

/**
 * @swagger
 * /deus-racas/{id}:
 *   delete:
 *     summary: Remove um relacionamento deus-raça
 *     tags: [DeusRacas]
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
router.delete('/:id', authMiddleware, deusRacaController.deleteDeusRaca.bind(deusRacaController));

export default router;