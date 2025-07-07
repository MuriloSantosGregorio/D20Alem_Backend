import { Router } from 'express';
import { OrigemController } from '../controllers/tabelas_base/origem.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const origemController = new OrigemController();

/**
 * @swagger
 * tags:
 *   name: Origens
 *   description: Gerenciamento de origens no sistema T20
 */

/**
 * @swagger
 * /origens:
 *   post:
 *     summary: Cria uma nova origem
 *     tags: [Origens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrigemDto'
 *     responses:
 *       201:
 *         description: Origem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrigemResponseDto'
 *       400:
 *         description: Nome da origem já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, origemController.createOrigem.bind(origemController));

/**
 * @swagger
 * /origens:
 *   get:
 *     summary: Retorna todas as origens
 *     tags: [Origens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de origens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrigemResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, origemController.getAllOrigens.bind(origemController));

/**
 * @swagger
 * /origens/{id}:
 *   get:
 *     summary: Obtém uma origem pelo ID
 *     tags: [Origens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da origem
 *     responses:
 *       200:
 *         description: Dados da origem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrigemResponseDto'
 *       404:
 *         description: Origem não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, origemController.getOrigemById.bind(origemController));

/**
 * @swagger
 * /origens/{id}:
 *   put:
 *     summary: Atualiza uma origem existente
 *     tags: [Origens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da origem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrigemDto'
 *     responses:
 *       200:
 *         description: Origem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrigemResponseDto'
 *       400:
 *         description: Nome da origem já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Origem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, origemController.updateOrigem.bind(origemController));

/**
 * @swagger
 * /origens/{id}:
 *   delete:
 *     summary: Remove uma origem
 *     tags: [Origens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da origem
 *     responses:
 *       204:
 *         description: Origem removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Origem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, origemController.deleteOrigem.bind(origemController));

export default router;