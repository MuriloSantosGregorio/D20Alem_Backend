import { Router } from 'express';
import { DeusClasseController } from '../controllers/tabelas_relacionamento/deusclasse.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const deusClasseController = new DeusClasseController();

/**
 * @swagger
 * tags:
 *   name: DeusClasses
 *   description: Gerenciamento de relacionamentos entre deuses e classes T20
 */

/**
 * @swagger
 * /deus-classes:
 *   post:
 *     summary: Cria um relacionamento entre deus e classe
 *     tags: [DeusClasses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeusClasseDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeusClasseResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Deus ou classe não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, deusClasseController.createDeusClasse.bind(deusClasseController));

/**
 * @swagger
 * /deus-classes:
 *   get:
 *     summary: Retorna todos os relacionamentos deus-classe
 *     tags: [DeusClasses]
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
 *                 $ref: '#/components/schemas/DeusClasseResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, deusClasseController.getAllDeusClasses.bind(deusClasseController));

/**
 * @swagger
 * /deus-classes/{id}:
 *   get:
 *     summary: Retorna um relacionamento deus-classe pelo ID
 *     tags: [DeusClasses]
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
 *               $ref: '#/components/schemas/DeusClasseResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, deusClasseController.getDeusClasseById.bind(deusClasseController));

/**
 * @swagger
 * /deus-classes/{id}:
 *   put:
 *     summary: Atualiza um relacionamento deus-classe
 *     tags: [DeusClasses]
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
 *             $ref: '#/components/schemas/UpdateDeusClasseDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeusClasseResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, deus ou classe não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, deusClasseController.updateDeusClasse.bind(deusClasseController));

/**
 * @swagger
 * /deus-classes/{id}:
 *   delete:
 *     summary: Remove um relacionamento deus-classe
 *     tags: [DeusClasses]
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
router.delete('/:id', authMiddleware, deusClasseController.deleteDeusClasse.bind(deusClasseController));

export default router;