import { Router } from 'express';
import { MagiaController } from '../controllers/tabelas_base/magia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const magiaController = new MagiaController();

/**
 * @swagger
 * tags:
 *   name: Magias
 *   description: Gerenciamento de magias T20
 */

/**
 * @swagger
 * /magias:
 *   post:
 *     summary: Cria uma nova magia
 *     tags: [Magias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMagiaDto'
 *     responses:
 *       201:
 *         description: Magia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagiaResponseDto'
 *       400:
 *         description: Nome da magia já em uso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, magiaController.createMagia.bind(magiaController));

/**
 * @swagger
 * /magias:
 *   get:
 *     summary: Retorna todas as magias
 *     tags: [Magias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de magias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MagiaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, magiaController.getAllMagia.bind(magiaController));

/**
 * @swagger
 * /magias/{id}:
 *   get:
 *     summary: Retorna uma magia pelo ID
 *     tags: [Magias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da magia
 *     responses:
 *       200:
 *         description: Dados da magia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagiaResponseDto'
 *       404:
 *         description: Magia não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, magiaController.getMagiaById.bind(magiaController));

/**
 * @swagger
 * /magias/{id}:
 *   put:
 *     summary: Atualiza uma magia
 *     tags: [Magias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da magia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMagiaDto'
 *     responses:
 *       200:
 *         description: Magia atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagiaResponseDto'
 *       400:
 *         description: Nome da magia já está em uso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Magia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, magiaController.updateMagia.bind(magiaController));

/**
 * @swagger
 * /magias/{id}:
 *   delete:
 *     summary: Remove uma magia
 *     tags: [Magias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da magia
 *     responses:
 *       204:
 *         description: Magia removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Magia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, magiaController.deleteMagia.bind(magiaController));

export default router;