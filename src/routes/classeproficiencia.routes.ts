import { Router } from 'express';
import { ClasseProficienciaController } from '../controllers/tabelas_relacionamento/classeproficiencia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const classeProficienciaController = new ClasseProficienciaController();

/**
 * @swagger
 * tags:
 *   name: ClasseProficiencias
 *   description: Gerenciamento de relacionamentos entre classes e proficiências T20
 */

/**
 * @swagger
 * /classe-proficiencias:
 *   post:
 *     summary: Cria um relacionamento entre classe e proficiência
 *     tags: [ClasseProficiencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClasseProficienciaDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseProficienciaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe ou proficiência não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, classeProficienciaController.createClasseProficiencia.bind(classeProficienciaController));

/**
 * @swagger
 * /classe-proficiencias:
 *   get:
 *     summary: Retorna todos os relacionamentos classe-proficiência
 *     tags: [ClasseProficiencias]
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
 *                 $ref: '#/components/schemas/ClasseProficienciaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, classeProficienciaController.getAllClasseProficiencias.bind(classeProficienciaController));

/**
 * @swagger
 * /classe-proficiencias/{id}:
 *   get:
 *     summary: Retorna um relacionamento classe-proficiência pelo ID
 *     tags: [ClasseProficiencias]
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
 *               $ref: '#/components/schemas/ClasseProficienciaResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, classeProficienciaController.getClasseProficienciaById.bind(classeProficienciaController));

/**
 * @swagger
 * /classe-proficiencias/{id}:
 *   put:
 *     summary: Atualiza um relacionamento classe-proficiência
 *     tags: [ClasseProficiencias]
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
 *             $ref: '#/components/schemas/UpdateClasseProficienciaDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseProficienciaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, classe ou proficiência não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, classeProficienciaController.updateClasseProficiencia.bind(classeProficienciaController));

/**
 * @swagger
 * /classe-proficiencias/{id}:
 *   delete:
 *     summary: Remove um relacionamento classe-proficiência
 *     tags: [ClasseProficiencias]
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
router.delete('/:id', authMiddleware, classeProficienciaController.deleteClasseProficiencia.bind(classeProficienciaController));

export default router;