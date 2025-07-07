import { Router } from 'express';
import { RacaController } from '../controllers/tabelas_base/raca.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const racaController = new RacaController();

/**
 * @swagger
 * tags:
 *   name: Raças
 *   description: Gerenciamento de raças T20
 */

/**
 * @swagger
 * /racas:
 *   post:
 *     summary: Cria uma nova raça
 *     tags: [Raças]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRacaDto'
 *     responses:
 *       201:
 *         description: Raça criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaResponseDto'
 *       400:
 *         description: Nome da raça já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tamanho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, racaController.createRaca.bind(racaController));

/**
 * @swagger
 * /racas:
 *   get:
 *     summary: Retorna todas as raças
 *     tags: [Raças]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de raças
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RacaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, racaController.getAllRacas.bind(racaController));

/**
 * @swagger
 * /racas/{id}:
 *   get:
 *     summary: Obtém uma raça pelo ID
 *     tags: [Raças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da raça
 *     responses:
 *       200:
 *         description: Dados da raça
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaResponseDto'
 *       404:
 *         description: Raça não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, racaController.getRacaById.bind(racaController));

/**
 * @swagger
 * /racas/{id}:
 *   put:
 *     summary: Atualiza uma raça existente
 *     tags: [Raças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da raça
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRacaDto'
 *     responses:
 *       200:
 *         description: Raça atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaResponseDto'
 *       400:
 *         description: Nome da raça já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Raça ou tamanho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, racaController.updateRaca.bind(racaController));

/**
 * @swagger
 * /racas/{id}:
 *   delete:
 *     summary: Remove uma raça
 *     tags: [Raças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da raça
 *     responses:
 *       204:
 *         description: Raça removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Raça não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, racaController.deleteRaca.bind(racaController));

export default router;