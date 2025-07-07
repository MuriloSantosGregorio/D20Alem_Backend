import { Router } from 'express';
import { ModMagiaController } from '../controllers/tabelas_base/modmagia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const modMagiaController = new ModMagiaController();

/**
 * @swagger
 * tags:
 *   name: ModMagia
 *   description: Gerenciamento de modificadores de magias T20
 */

/**
 * @swagger
 * /modmagias:
 *   post:
 *     summary: Cria um novo modificador de magia
 *     tags: [ModMagia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModMagiaDto'
 *     responses:
 *       201:
 *         description: Modificador de magia criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModMagiaResponseDto'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Magia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, modMagiaController.createModMagia.bind(modMagiaController));

/**
 * @swagger
 * /modmagias:
 *   get:
 *     summary: Retorna todos os modificadores de magia
 *     tags: [ModMagia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de modificadores de magia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ModMagiaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, modMagiaController.getAllModMagias.bind(modMagiaController));

/**
 * @swagger
 * /modmagias/{id}:
 *   get:
 *     summary: Obtém um modificador de magia pelo ID
 *     tags: [ModMagia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do modificador de magia
 *     responses:
 *       200:
 *         description: Dados do modificador de magia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModMagiaResponseDto'
 *       404:
 *         description: Modificador de magia não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, modMagiaController.getModMagiaById.bind(modMagiaController));

/**
 * @swagger
 * /modmagias/{id}:
 *   put:
 *     summary: Atualiza um modificador de magia
 *     tags: [ModMagia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do modificador de magia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateModMagiaDto'
 *     responses:
 *       200:
 *         description: Modificador de magia atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModMagiaResponseDto'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Modificador de magia ou magia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, modMagiaController.updateModMagia.bind(modMagiaController));

/**
 * @swagger
 * /modmagias/{id}:
 *   delete:
 *     summary: Remove um modificador de magia
 *     tags: [ModMagia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do modificador de magia
 *     responses:
 *       204:
 *         description: Modificador de magia removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Modificador de magia não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, modMagiaController.deleteModMagia.bind(modMagiaController));

export default router;