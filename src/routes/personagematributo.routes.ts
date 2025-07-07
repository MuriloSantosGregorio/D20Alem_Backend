import { Router } from 'express';
import { PersonagemAtributoController } from '../controllers/tabelas_relacionamento/personagematributo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const personagemAtributoController = new PersonagemAtributoController();

/**
 * @swagger
 * tags:
 *   name: PersonagemAtributos
 *   description: Gerenciamento de atributos associados a personagens T20
 */

/**
 * @swagger
 * /personagem-atributos:
 *   post:
 *     summary: Cria uma nova associação de atributo a um personagem
 *     tags: [PersonagemAtributos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonagemAtributoDto'
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemAtributoResponseDto'
 *       400:
 *         description: Dados inválidos ou atributo já associado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atributo ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, personagemAtributoController.createPersonagemAtributo.bind(personagemAtributoController));

/**
 * @swagger
 * /personagem-atributos:
 *   get:
 *     summary: Retorna todas as associações de atributos a personagens
 *     tags: [PersonagemAtributos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de associações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PersonagemAtributoResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, personagemAtributoController.getAllPersonagemAtributos.bind(personagemAtributoController));

/**
 * @swagger
 * /personagem-atributos/{id}:
 *   get:
 *     summary: Retorna uma associação de atributo a personagem pelo ID
 *     tags: [PersonagemAtributos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-atributo
 *     responses:
 *       200:
 *         description: Dados da associação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemAtributoResponseDto'
 *       404:
 *         description: Associação não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, personagemAtributoController.getPersonagemAtributoById.bind(personagemAtributoController));

/**
 * @swagger
 * /personagem-atributos/{id}:
 *   put:
 *     summary: Atualiza uma associação de atributo a personagem
 *     tags: [PersonagemAtributos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-atributo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonagemAtributoDto'
 *     responses:
 *       200:
 *         description: Associação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemAtributoResponseDto'
 *       400:
 *         description: Dados inválidos ou atributo já associado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Associação, atributo ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, personagemAtributoController.updatePersonagemAtributo.bind(personagemAtributoController));

/**
 * @swagger
 * /personagem-atributos/{id}:
 *   delete:
 *     summary: Remove uma associação de atributo a personagem
 *     tags: [PersonagemAtributos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-atributo
 *     responses:
 *       204:
 *         description: Associação removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, personagemAtributoController.deletePersonagemAtributo.bind(personagemAtributoController));

export default router;