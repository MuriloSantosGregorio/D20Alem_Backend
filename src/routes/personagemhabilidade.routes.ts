import { Router } from 'express';
import { PersonagemHabilidadeController } from '../controllers/tabelas_relacionamento/personagemhabilidade.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const personagemHabilidadeController = new PersonagemHabilidadeController();

/**
 * @swagger
 * tags:
 *   name: PersonagemHabilidades
 *   description: Gerenciamento de habilidades associadas a personagens T20
 */

/**
 * @swagger
 * /personagem-habilidades:
 *   post:
 *     summary: Cria uma nova associação de habilidade a um personagem
 *     tags: [PersonagemHabilidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonagemHabilidadeDto'
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemHabilidadeResponseDto'
 *       400:
 *         description: Dados inválidos ou habilidade já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Habilidade ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, personagemHabilidadeController.createPersonagemHabilidade.bind(personagemHabilidadeController));

/**
 * @swagger
 * /personagem-habilidades:
 *   get:
 *     summary: Retorna todas as associações de habilidades a personagens
 *     tags: [PersonagemHabilidades]
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
 *                 $ref: '#/components/schemas/PersonagemHabilidadeResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, personagemHabilidadeController.getAllPersonagemHabilidades.bind(personagemHabilidadeController));

/**
 * @swagger
 * /personagem-habilidades/{id}:
 *   get:
 *     summary: Retorna uma associação de habilidade a personagem pelo ID
 *     tags: [PersonagemHabilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-habilidade
 *     responses:
 *       200:
 *         description: Dados da associação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemHabilidadeResponseDto'
 *       404:
 *         description: Associação não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, personagemHabilidadeController.getPersonagemHabilidadeById.bind(personagemHabilidadeController));

/**
 * @swagger
 * /personagem-habilidades/{id}:
 *   put:
 *     summary: Atualiza uma associação de habilidade a personagem
 *     tags: [PersonagemHabilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-habilidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonagemHabilidadeDto'
 *     responses:
 *       200:
 *         description: Associação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemHabilidadeResponseDto'
 *       400:
 *         description: Dados inválidos ou habilidade já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Associação, habilidade ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, personagemHabilidadeController.updatePersonagemHabilidade.bind(personagemHabilidadeController));

/**
 * @swagger
 * /personagem-habilidades/{id}:
 *   delete:
 *     summary: Remove uma associação de habilidade a personagem
 *     tags: [PersonagemHabilidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-habilidade
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
router.delete('/:id', authMiddleware, personagemHabilidadeController.deletePersonagemHabilidade.bind(personagemHabilidadeController));

export default router;