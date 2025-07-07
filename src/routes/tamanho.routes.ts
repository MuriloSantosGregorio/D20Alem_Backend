import { Router } from 'express';
import { TamanhoController } from '../controllers/tabelas_base/tamanho.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const tamanhoController = new TamanhoController();

/**
 * @swagger
 * tags:
 *   name: Tamanhos
 *   description: Gerenciamento de tamanhos no sistema T20
 */

/**
 * @swagger
 * /tamanhos:
 *   post:
 *     summary: Cria um novo tamanho
 *     tags: [Tamanhos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTamanhoDto'
 *     responses:
 *       201:
 *         description: Tamanho criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TamanhoResponseDto'
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, tamanhoController.createTamanho.bind(tamanhoController));

/**
 * @swagger
 * /tamanhos:
 *   get:
 *     summary: Retorna todos os tamanhos cadastrados
 *     tags: [Tamanhos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tamanhos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TamanhoResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, tamanhoController.getAllTamanhos.bind(tamanhoController));

/**
 * @swagger
 * /tamanhos/{id}:
 *   get:
 *     summary: Obtém um tamanho pelo ID
 *     tags: [Tamanhos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do tamanho
 *     responses:
 *       200:
 *         description: Dados do tamanho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TamanhoResponseDto'
 *       404:
 *         description: Tamanho não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, tamanhoController.getTamanhoById.bind(tamanhoController));

/**
 * @swagger
 * /tamanhos/{id}:
 *   put:
 *     summary: Atualiza um tamanho existente
 *     tags: [Tamanhos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do tamanho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTamanhoDto'
 *     responses:
 *       200:
 *         description: Tamanho atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TamanhoResponseDto'
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tamanho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, tamanhoController.updateTamanho.bind(tamanhoController));

/**
 * @swagger
 * /tamanhos/{id}:
 *   delete:
 *     summary: Remove um tamanho
 *     tags: [Tamanhos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do tamanho
 *     responses:
 *       204:
 *         description: Tamanho removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tamanho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, tamanhoController.deleteTamanho.bind(tamanhoController));

export default router;