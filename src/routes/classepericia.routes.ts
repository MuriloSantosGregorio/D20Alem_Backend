import { Router } from 'express';
import { ClassePericiaController } from '../controllers/tabelas_relacionamento/classepericia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const classePericiaController = new ClassePericiaController();

/**
 * @swagger
 * tags:
 *   name: ClassePericia
 *   description: Gerenciamento de relações entre classes e perícias T20
 */

/**
 * @swagger
 * /classe-pericias:
 *   post:
 *     summary: Cria uma nova relação entre classe e perícia
 *     tags: [ClassePericia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassePericiaDto'
 *     responses:
 *       201:
 *         description: Relação classe-perícia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassePericiaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe ou perícia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, classePericiaController.createClassePericia.bind(classePericiaController));

/**
 * @swagger
 * /classe-pericias:
 *   get:
 *     summary: Retorna todas as relações classe-perícia
 *     tags: [ClassePericia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de relações classe-perícia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassePericiaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, classePericiaController.getAllClassePericias.bind(classePericiaController));

/**
 * @swagger
 * /classe-pericias/{id}:
 *   get:
 *     summary: Obtém uma relação classe-perícia pelo ID
 *     tags: [ClassePericia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da relação classe-perícia
 *     responses:
 *       200:
 *         description: Dados da relação classe-perícia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassePericiaResponseDto'
 *       404:
 *         description: Relação classe-perícia não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, classePericiaController.getClassePericiaById.bind(classePericiaController));

/**
 * @swagger
 * /classe-pericias/{id}:
 *   put:
 *     summary: Atualiza uma relação classe-perícia
 *     tags: [ClassePericia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da relação classe-perícia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClassePericiaDto'
 *     responses:
 *       200:
 *         description: Relação classe-perícia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassePericiaResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relação, classe ou perícia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, classePericiaController.updateClassePericia.bind(classePericiaController));

/**
 * @swagger
 * /classe-pericias/{id}:
 *   delete:
 *     summary: Remove uma relação classe-perícia
 *     tags: [ClassePericia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da relação classe-perícia
 *     responses:
 *       204:
 *         description: Relação classe-perícia removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relação classe-perícia não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, classePericiaController.deleteClassePericia.bind(classePericiaController));

export default router;