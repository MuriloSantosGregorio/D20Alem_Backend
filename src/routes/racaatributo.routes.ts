import { Router } from 'express';
import { RacaAtributoController } from '../controllers/tabelas_relacionamento/racaatributo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const racaAtributoController = new RacaAtributoController();

/**
 * @swagger
 * tags:
 *   name: RacaAtributos
 *   description: Gerenciamento de relacionamentos entre raças e atributos T20
 */

/**
 * @swagger
 * /raca-atributos:
 *   post:
 *     summary: Cria um relacionamento entre raça e atributo
 *     tags: [RacaAtributos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRacaAtributoDto'
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaAtributoResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Raça ou atributo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, racaAtributoController.createRacaAtributo.bind(racaAtributoController));

/**
 * @swagger
 * /raca-atributos:
 *   get:
 *     summary: Retorna todos os relacionamentos raça-atributo
 *     tags: [RacaAtributos]
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
 *                 $ref: '#/components/schemas/RacaAtributoResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, racaAtributoController.getAllRacaAtributos.bind(racaAtributoController));

/**
 * @swagger
 * /raca-atributos/{id}:
 *   get:
 *     summary: Retorna um relacionamento raça-atributo pelo ID
 *     tags: [RacaAtributos]
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
 *               $ref: '#/components/schemas/RacaAtributoResponseDto'
 *       404:
 *         description: Relacionamento não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, racaAtributoController.getRacaAtributoById.bind(racaAtributoController));

/**
 * @swagger
 * /raca-atributos/{id}:
 *   put:
 *     summary: Atualiza um relacionamento raça-atributo
 *     tags: [RacaAtributos]
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
 *             $ref: '#/components/schemas/UpdateRacaAtributoDto'
 *     responses:
 *       200:
 *         description: Relacionamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RacaAtributoResponseDto'
 *       400:
 *         description: Relação já existe ou dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Relacionamento, raça ou atributo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, racaAtributoController.updateRacaAtributo.bind(racaAtributoController));

/**
 * @swagger
 * /raca-atributos/{id}:
 *   delete:
 *     summary: Remove um relacionamento raça-atributo
 *     tags: [RacaAtributos]
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
router.delete('/:id', authMiddleware, racaAtributoController.deleteRacaAtributo.bind(racaAtributoController));

export default router;