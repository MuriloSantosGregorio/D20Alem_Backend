import { Router } from 'express';
import { ProficienciaController } from '../controllers/tabelas_base/proficiencia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const proficienciaController = new ProficienciaController();

/**
 * @swagger
 * tags:
 *   name: Proficiências
 *   description: Gerenciamento de proficiências T20
 */

/**
 * @swagger
 * /proficiencias:
 *   post:
 *     summary: Cria uma nova proficiência
 *     tags: [Proficiências]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProficienciaDto'
 *     responses:
 *       201:
 *         description: Proficiência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProficienciaResponseDto'
 *       400:
 *         description: Nome da proficiência já em uso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, proficienciaController.createProficiencia.bind(proficienciaController));

/**
 * @swagger
 * /proficiencias:
 *   get:
 *     summary: Retorna todas as proficiências
 *     tags: [Proficiências]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proficiências
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProficienciaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, proficienciaController.getAllProficiencia.bind(proficienciaController));

/**
 * @swagger
 * /proficiencias/{id}:
 *   get:
 *     summary: Retorna uma proficiência pelo ID
 *     tags: [Proficiências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da proficiência
 *     responses:
 *       200:
 *         description: Dados da proficiência
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProficienciaResponseDto'
 *       404:
 *         description: Proficiência não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, proficienciaController.getProficienciaById.bind(proficienciaController));

/**
 * @swagger
 * /proficiencias/{id}:
 *   put:
 *     summary: Atualiza uma proficiência
 *     tags: [Proficiências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da proficiência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProficienciaDto'
 *     responses:
 *       200:
 *         description: Proficiência atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProficienciaResponseDto'
 *       400:
 *         description: Nome da proficiência já está em uso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Proficiência não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, proficienciaController.updateProficiencia.bind(proficienciaController));

/**
 * @swagger
 * /proficiencias/{id}:
 *   delete:
 *     summary: Remove uma proficiência
 *     tags: [Proficiências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da proficiência
 *     responses:
 *       204:
 *         description: Proficiência removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Proficiência não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, proficienciaController.deleteProficiencia.bind(proficienciaController));

export default router;