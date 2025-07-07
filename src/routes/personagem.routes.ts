import { Router } from 'express';
import { PersonagemController } from '../controllers/tabelas_base/personagem.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const personagemController = new PersonagemController();

/**
 * @swagger
 * tags:
 *   name: Personagens
 *   description: Gerenciamento de personagens T20
 */

/**
 * @swagger
 * /personagens:
 *   post:
 *     summary: Cria um novo personagem (usuarioid é obtido do token)
 *     tags: [Personagens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonagemDto'
 *     responses:
 *       201:
 *         description: Personagem criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemResponseDto'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Entidade relacionada não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, personagemController.createPersonagem.bind(personagemController));

/**
 * @swagger
 * /personagens:
 *   get:
 *     summary: Retorna todos os personagens
 *     tags: [Personagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de personagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PersonagemResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, personagemController.getAllPersonagens.bind(personagemController));

/**
 * @swagger
 * /personagens/{id}:
 *   get:
 *     summary: Retorna um personagem pelo ID
 *     tags: [Personagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do personagem
 *     responses:
 *       200:
 *         description: Dados do personagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemResponseDto'
 *       404:
 *         description: Personagem não encontrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, personagemController.getPersonagemById.bind(personagemController));

/**
 * @swagger
 * /personagens/{id}:
 *   put:
 *     summary: Atualiza um personagem
 *     tags: [Personagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do personagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonagemDto'
 *     responses:
 *       200:
 *         description: Personagem atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemResponseDto'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Personagem ou entidade relacionada não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, personagemController.updatePersonagem.bind(personagemController));

/**
 * @swagger
 * /personagens/{id}:
 *   delete:
 *     summary: Remove um personagem
 *     tags: [Personagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do personagem
 *     responses:
 *       204:
 *         description: Personagem removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, personagemController.deletePersonagem.bind(personagemController));

export default router;