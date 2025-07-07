import { Router } from 'express';
import { ClasseController } from '../controllers/tabelas_base/classe.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const classeController = new ClasseController();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gerenciamento de classes T20
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Cria uma ou mais classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClasseDto'
 *     responses:
 *       201:
 *         description: Classe criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseResponseDto'
 *       400:
 *         description: Nome da classe já em uso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, classeController.createClasse.bind(classeController));

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Retorna todas as classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClasseResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, classeController.getAllClasses.bind(classeController));

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Retorna uma classe pelo ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da classe
 *     responses:
 *       200:
 *         description: Dados da classe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseResponseDto'
 *       404:
 *         description: Classe não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, classeController.getClasseById.bind(classeController));

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Atualiza uma classe
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da classe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClasseDto'
 *     responses:
 *       200:
 *         description: Classe atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseResponseDto'
 *       400:
 *         description: Nome da classe já está em uso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, classeController.updateClasse.bind(classeController));

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Remove uma classe
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da classe
 *     responses:
 *       204:
 *         description: Classe removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, classeController.deleteClasse.bind(classeController));

export default router;