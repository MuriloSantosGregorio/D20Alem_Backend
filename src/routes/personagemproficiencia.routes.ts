import { Router } from 'express';
import { PersonagemProficienciaController } from '../controllers/tabelas_relacionamento/personagemproficiencia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const personagemProficienciaController = new PersonagemProficienciaController();

/**
 * @swagger
 * tags:
 *   name: PersonagemProficiencias
 *   description: Gerenciamento de proficiências associadas a personagens T20
 */

/**
 * @swagger
 * /personagem-proficiencias:
 *   post:
 *     summary: Cria uma nova associação de proficiência a um personagem
 *     tags: [PersonagemProficiencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonagemProficienciaDto'
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemProficienciaResponseDto'
 *       400:
 *         description: Dados inválidos ou proficiência já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Proficiência ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, personagemProficienciaController.createPersonagemProficiencia.bind(personagemProficienciaController));

/**
 * @swagger
 * /personagem-proficiencias:
 *   get:
 *     summary: Retorna todas as associações de proficiências a personagens
 *     tags: [PersonagemProficiencias]
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
 *                 $ref: '#/components/schemas/PersonagemProficienciaResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, personagemProficienciaController.getAllPersonagemProficiencias.bind(personagemProficienciaController));

/**
 * @swagger
 * /personagem-proficiencias/{id}:
 *   get:
 *     summary: Retorna uma associação de proficiência a personagem pelo ID
 *     tags: [PersonagemProficiencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-proficiência
 *     responses:
 *       200:
 *         description: Dados da associação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemProficienciaResponseDto'
 *       404:
 *         description: Associação não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, personagemProficienciaController.getPersonagemProficienciaById.bind(personagemProficienciaController));

/**
 * @swagger
 * /personagem-proficiencias/{id}:
 *   put:
 *     summary: Atualiza uma associação de proficiência a personagem
 *     tags: [PersonagemProficiencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-proficiência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonagemProficienciaDto'
 *     responses:
 *       200:
 *         description: Associação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemProficienciaResponseDto'
 *       400:
 *         description: Dados inválidos ou proficiência já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Associação, proficiência ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, personagemProficienciaController.updatePersonagemProficiencia.bind(personagemProficienciaController));

/**
 * @swagger
 * /personagem-proficiencias/{id}:
 *   delete:
 *     summary: Remove uma associação de proficiência a personagem
 *     tags: [PersonagemProficiencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-proficiência
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
router.delete('/:id', authMiddleware, personagemProficienciaController.deletePersonagemProficiencia.bind(personagemProficienciaController));

export default router;