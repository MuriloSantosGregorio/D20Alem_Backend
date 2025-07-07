import { Router } from 'express';
import { AtributoController } from '../controllers/tabelas_base/atributo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const atributoController = new AtributoController();

/**
 * @swagger
 * tags:
 *   name: Atributos
 *   description: Gerenciamento de atributos T20
 */

/**
 * @swagger
 * /atributos:
 *   post:
 *     summary: Cria um novo atributo
 *     tags: [Atributos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAtributoDto'
 *     responses:
 *       201:
 *         description: Atributo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtributoResponseDto'
 *       400:
 *         description: Nome do atributo já está em uso
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, atributoController.createAtributo.bind(atributoController));

/**
 * @swagger
 * /atributos:
 *   get:
 *     summary: Retorna todos os atributos
 *     tags: [Atributos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de atributos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AtributoResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, atributoController.getAllAtributos.bind(atributoController));

/**
 * @swagger
 * /atributos/{id}:
 *   get:
 *     summary: Retorna um atributo pelo ID
 *     tags: [Atributos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do atributo
 *     responses:
 *       200:
 *         description: Dados do atributo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtributoResponseDto'
 *       404:
 *         description: Atributo não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, atributoController.getAtributoById.bind(atributoController));

/**
 * @swagger
 * /atributos/{id}:
 *   put:
 *     summary: Atualiza um atributo
 *     tags: [Atributos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do atributo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAtributoDto'
 *     responses:
 *       200:
 *         description: Atributo atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtributoResponseDto'
 *       400:
 *         description: Nome do atributo já está em uso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atributo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, atributoController.updateAtributo.bind(atributoController));

/**
 * @swagger
 * /atributos/{id}:
 *   delete:
 *     summary: Remove um atributo
 *     tags: [Atributos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do atributo
 *     responses:
 *       204:
 *         description: Atributo removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atributo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, atributoController.deleteAtributo.bind(atributoController));

export default router;