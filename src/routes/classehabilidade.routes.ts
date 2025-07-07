import { Router } from 'express';
import { ClasseHabilidadeController } from '../controllers/tabelas_relacionamento/classehabilidade.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const classeHabilidadeController = new ClasseHabilidadeController();

/**
 * @swagger
 * tags:
 *   name: ClasseHabilidades
 *   description: Gerenciamento de relacionamentos entre classes e habilidades T20
 */

/**
 * @swagger
 * /classe-habilidades:
 *   post:
 *     summary: Cria um relacionamento entre classe e habilidade
 *     tags: [ClasseHabilidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClasseHabilidadeDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseHabilidadeResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe ou habilidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, classeHabilidadeController.createClasseHabilidade.bind(classeHabilidadeController));

/**
 * @swagger
 * /classe-habilidades:
 *   get:
 *     summary: Retorna todos os relacionamentos classe-habilidade
 *     tags: [ClasseHabilidades]
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
 *                 $ref: '#/components/schemas/ClasseHabilidadeResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, classeHabilidadeController.getAllClasseHabilidades.bind(classeHabilidadeController));

/**
 * @swagger
 * /classe-habilidades/{id}:
 *   get:
 *     summary: Retorna um relacionamento classe-habilidade pelo ID
 *     tags: [ClasseHabilidades]
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
 *               $ref: '#/components/schemas/ClasseHabilidadeResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, classeHabilidadeController.getClasseHabilidadeById.bind(classeHabilidadeController));

/**
 * @swagger
 * /classe-habilidades/{id}:
 *   put:
 *     summary: Atualiza um relacionamento classe-habilidade
 *     tags: [ClasseHabilidades]
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
 *             $ref: '#/components/schemas/UpdateClasseHabilidadeDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClasseHabilidadeResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, classe ou habilidade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, classeHabilidadeController.updateClasseHabilidade.bind(classeHabilidadeController));

/**
 * @swagger
 * /classe-habilidades/{id}:
 *   delete:
 *     summary: Remove um relacionamento classe-habilidade
 *     tags: [ClasseHabilidades]
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
router.delete('/:id', authMiddleware, classeHabilidadeController.deleteClasseHabilidade.bind(classeHabilidadeController));

export default router;