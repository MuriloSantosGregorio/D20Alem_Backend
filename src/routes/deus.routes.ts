import { Router } from 'express';
import { DeusController } from '../controllers/tabelas_base/deus.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const deusController = new DeusController();

/**
 * @swagger
 * tags:
 *   name: Deuses
 *   description: Gerenciamento de deuses T20
 */

/**
 * @swagger
 * /deuses:
 *   post:
 *     summary: Cria um ou mais deuses
 *     tags: [Deuses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkCreateDeusDto'
 *     responses:
 *       201:
 *         description: Deuses criados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeusResponseDto'
 *       400:
 *         description: Nomes de deuses duplicados ou já em uso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, deusController.createDeus.bind(deusController));

/**
 * @swagger
 * /deuses:
 *   get:
 *     summary: Retorna todos os deuses
 *     tags: [Deuses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de deuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeusResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, deusController.getAllDeus.bind(deusController));

/**
 * @swagger
 * /deuses/{id}:
 *   get:
 *     summary: Retorna um deus pelo ID
 *     tags: [Deuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do deus
 *     responses:
 *       200:
 *         description: Dados do deus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeusResponseDto'
 *       404:
 *         description: Deus não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, deusController.getDeusById.bind(deusController));

/**
 * @swagger
 * /deuses/{id}:
 *   put:
 *     summary: Atualiza um deus
 *     tags: [Deuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do deus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDeusDto'
 *     responses:
 *       200:
 *         description: Deus atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeusResponseDto'
 *       400:
 *         description: Nome do deus já está em uso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Deus não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, deusController.updateDeus.bind(deusController));

/**
 * @swagger
 * /deuses/{id}:
 *   delete:
 *     summary: Remove um deus
 *     tags: [Deuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do deus
 *     responses:
 *       204:
 *         description: Deus removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Deus não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, deusController.deleteDeus.bind(deusController));

export default router;