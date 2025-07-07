import { Router } from 'express';
import { PersonagemPericiaController } from '../controllers/tabelas_relacionamento/personagempericia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const personagemPericiaController = new PersonagemPericiaController();

/**
 * @swagger
 * tags:
 *   name: PersonagemPericias
 *   description: Gerenciamento de perícias associadas a personagens T20
 */

/**
 * @swagger
 * /personagem-pericias:
 *   post:
 *     summary: Cria uma nova associação de perícia a um personagem
 *     tags: [PersonagemPericias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonagemPericiaDto'
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemPericiaResponseDto'
 *       400:
 *         description: Dados inválidos ou perícia já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Perícia ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, personagemPericiaController.createPersonagemPericia.bind(personagemPericiaController));

/**
 * @swagger
 * /personagem-pericias:
 *   get:
 *     summary: Retorna todas as associações de perícias a personagens
 *     tags: [PersonagemPericias]
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
 *                 $ref: '#/components/schemas/PersonagemPericiaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, personagemPericiaController.getAllPersonagemPericias.bind(personagemPericiaController));

/**
 * @swagger
 * /personagem-pericias/{id}:
 *   get:
 *     summary: Retorna uma associação de perícia a personagem pelo ID
 *     tags: [PersonagemPericias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-perícia
 *     responses:
 *       200:
 *         description: Dados da associação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemPericiaResponseDto'
 *       404:
 *         description: Associação não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, personagemPericiaController.getPersonagemPericiaById.bind(personagemPericiaController));

/**
 * @swagger
 * /personagem-pericias/{id}:
 *   put:
 *     summary: Atualiza uma associação de perícia a personagem
 *     tags: [PersonagemPericias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-perícia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonagemPericiaDto'
 *     responses:
 *       200:
 *         description: Associação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemPericiaResponseDto'
 *       400:
 *         description: Dados inválidos ou perícia já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Associação, perícia ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, personagemPericiaController.updatePersonagemPericia.bind(personagemPericiaController));

/**
 * @swagger
 * /personagem-pericias/{id}:
 *   delete:
 *     summary: Remove uma associação de perícia a personagem
 *     tags: [PersonagemPericias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-perícia
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
router.delete('/:id', authMiddleware, personagemPericiaController.deletePersonagemPericia.bind(personagemPericiaController));

export default router;