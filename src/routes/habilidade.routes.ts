import { Router } from 'express';
import { HabilidadeController } from '../controllers/tabelas_base/habilidade.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const habilidadeController = new HabilidadeController();

/**
 * @swagger
 * tags:
 *   name: Habilidades
 *   description: Gerenciamento de habilidades T20
 */

/**
 * @swagger
 * /habilidades:
 *   post:
 *     summary: Cria uma ou mais habilidades
 *     tags: [Habilidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHabilidadeDto'
 *     responses:
 *       201:
 *         description: Habilidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HabilidadeResponseDto'
 *       400:
 *         description: Nome da habilidade já em uso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, habilidadeController.createHabilidade.bind(habilidadeController));

/**
 * @swagger
 * /habilidades:
 *   get:
 *     summary: Retorna todas as habilidades
 *     tags: [Habilidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de habilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HabilidadeResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, habilidadeController.getAllHabilidades.bind(habilidadeController));

/**
 * @swagger
 * /habilidades/{id}:
 *   get:
 *     summary: Retorna uma habilidade pelo ID
 *     tags: [Habilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da habilidade
 *     responses:
 *       200:
 *         description: Dados da habilidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HabilidadeResponseDto'
 *       404:
 *         description: Habilidade não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, habilidadeController.getHabilidadeById.bind(habilidadeController));

/**
 * @swagger
 * /habilidades/{id}:
 *   put:
 *     summary: Atualiza uma habilidade
 *     tags: [Habilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da habilidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHabilidadeDto'
 *     responses:
 *       200:
 *         description: Habilidade atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HabilidadeResponseDto'
 *       400:
 *         description: Nome da habilidade já está em uso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Habilidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, habilidadeController.updateHabilidade.bind(habilidadeController));

/**
 * @swagger
 * /habilidades/{id}:
 *   delete:
 *     summary: Remove uma habilidade
 *     tags: [Habilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da habilidade
 *     responses:
 *       204:
 *         description: Habilidade removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Habilidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, habilidadeController.deleteHabilidade.bind(habilidadeController));

export default router;