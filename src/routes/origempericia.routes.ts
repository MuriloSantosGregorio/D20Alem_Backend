import { Router } from 'express';
import { OrigemPericiaController } from '../controllers/tabelas_relacionamento/origempericia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const origemPericiaController = new OrigemPericiaController();

/**
 * @swagger
 * tags:
 *   name: OrigemPericias
 *   description: Gerenciamento de relacionamentos entre origens e perícias T20
 */

/**
 * @swagger
 * /origem-pericias:
 *   post:
 *     summary: Cria um relacionamento entre origem e perícia
 *     tags: [OrigemPericias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrigemPericiaDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrigemPericiaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Origem ou perícia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, origemPericiaController.createOrigemPericia.bind(origemPericiaController));

/**
 * @swagger
 * /origem-pericias:
 *   get:
 *     summary: Retorna todos os relacionamentos origem-perícia
 *     tags: [OrigemPericias]
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
 *                 $ref: '#/components/schemas/OrigemPericiaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, origemPericiaController.getAllOrigemPericias.bind(origemPericiaController));

/**
 * @swagger
 * /origem-pericias/{id}:
 *   get:
 *     summary: Retorna um relacionamento origem-perícia pelo ID
 *     tags: [OrigemPericias]
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
 *               $ref: '#/components/schemas/OrigemPericiaResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, origemPericiaController.getOrigemPericiaById.bind(origemPericiaController));

/**
 * @swagger
 * /origem-pericias/{id}:
 *   put:
 *     summary: Atualiza um relacionamento origem-perícia
 *     tags: [OrigemPericias]
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
 *             $ref: '#/components/schemas/UpdateOrigemPericiaDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrigemPericiaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, origem ou perícia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, origemPericiaController.updateOrigemPericia.bind(origemPericiaController));

/**
 * @swagger
 * /origem-pericias/{id}:
 *   delete:
 *     summary: Remove um relacionamento origem-perícia
 *     tags: [OrigemPericias]
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
router.delete('/:id', authMiddleware, origemPericiaController.deleteOrigemPericia.bind(origemPericiaController));

export default router;