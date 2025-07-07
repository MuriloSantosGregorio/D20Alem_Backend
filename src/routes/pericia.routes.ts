import { Router } from 'express';
import { PericiaController } from '../controllers/tabelas_base/pericia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const periciaController = new PericiaController();

/**
 * @swagger
 * tags:
 *   name: Perícias
 *   description: Gerenciamento de perícias T20
 */

/**
 * @swagger
 * /pericias:
 *   post:
 *     summary: Cria uma nova perícia
 *     tags: [Perícias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePericiaDto'
 *     responses:
 *       201:
 *         description: Perícia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PericiaResponseDto'
 *       400:
 *         description: Nome da perícia já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atributo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, periciaController.createPericia.bind(periciaController));

/**
 * @swagger
 * /pericias:
 *   get:
 *     summary: Retorna todas as perícias
 *     tags: [Perícias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de perícias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PericiaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, periciaController.getAllPericias.bind(periciaController));

/**
 * @swagger
 * /pericias/{id}:
 *   get:
 *     summary: Obtém uma perícia pelo ID
 *     tags: [Perícias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da perícia
 *     responses:
 *       200:
 *         description: Dados da perícia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PericiaResponseDto'
 *       404:
 *         description: Perícia não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, periciaController.getPericiaById.bind(periciaController));

/**
 * @swagger
 * /pericias/{id}:
 *   put:
 *     summary: Atualiza uma perícia existente
 *     tags: [Perícias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da perícia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePericiaDto'
 *     responses:
 *       200:
 *         description: Perícia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PericiaResponseDto'
 *       400:
 *         description: Nome da perícia já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Perícia ou atributo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, periciaController.updatePericia.bind(periciaController));

/**
 * @swagger
 * /pericias/{id}:
 *   delete:
 *     summary: Remove uma perícia
 *     tags: [Perícias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da perícia
 *     responses:
 *       204:
 *         description: Perícia removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Perícia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, periciaController.deletePericia.bind(periciaController));

export default router;