import { Router } from 'express';
import { PersonagemClasseController } from '../controllers/tabelas_relacionamento/personagemclasse.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const personagemClasseController = new PersonagemClasseController();

/**
 * @swagger
 * tags:
 *   name: PersonagemClasses
 *   description: Gerenciamento de classes associadas a personagens T20
 */

/**
 * @swagger
 * /personagem-classes:
 *   post:
 *     summary: Cria uma nova associação de classe a um personagem
 *     tags: [PersonagemClasses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonagemClasseDto'
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       400:
 *         description: Dados inválidos ou classe já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, personagemClasseController.createPersonagemClasse.bind(personagemClasseController));

/**
 * @swagger
 * /personagem-classes:
 *   get:
 *     summary: Retorna todas as associações de classes a personagens
 *     tags: [PersonagemClasses]
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
 *                 $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, personagemClasseController.getAllPersonagemClasses.bind(personagemClasseController));

/**
 * @swagger
 * /personagem-classes/{id}:
 *   get:
 *     summary: Retorna uma associação de classe a personagem pelo ID
 *     tags: [PersonagemClasses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-classe
 *     responses:
 *       200:
 *         description: Dados da associação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       404:
 *         description: Associação não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, personagemClasseController.getPersonagemClasseById.bind(personagemClasseController));

/**
 * @swagger
 * /personagem-classes/{id}:
 *   put:
 *     summary: Atualiza uma associação de classe a personagem
 *     tags: [PersonagemClasses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-classe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonagemClasseDto'
 *     responses:
 *       200:
 *         description: Associação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       400:
 *         description: Dados inválidos ou classe já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Associação, classe ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, personagemClasseController.updatePersonagemClasse.bind(personagemClasseController));

/**
 * @swagger
 * /personagem-classes/{id}:
 *   delete:
 *     summary: Remove uma associação de classe a personagem
 *     tags: [PersonagemClasses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da associação personagem-classe
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
router.delete('/:id', authMiddleware, personagemClasseController.deletePersonagemClasse.bind(personagemClasseController));

/**
 * @swagger
 * /personagem-classes/levelup:
 *   post:
 *     summary: Aumenta o nível de uma classe associada a um personagem ou cria uma nova associação com nível 1
 *     tags: [PersonagemClasses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - personagemid
 *               - classeid
 *             properties:
 *               personagemid:
 *                 type: string
 *                 format: uuid
 *                 description: ID do personagem
 *                 example: b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7
 *               classeid:
 *                 type: string
 *                 format: uuid
 *                 description: ID da classe
 *                 example: a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
 *     responses:
 *       201:
 *         description: Nova associação criada (nível 1)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       200:
 *         description: Nível da classe incrementado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       400:
 *         description: Dados inválidos ou classe já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/levelup', authMiddleware, personagemClasseController.levelUp.bind(personagemClasseController));

/**
 * @swagger
 * /personagem-classes/firstlevel:
 *   post:
 *     summary: Cria uma nova associação de classe a um personagem com nível 1
 *     tags: [PersonagemClasses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - personagemid
 *               - classeid
 *             properties:
 *               personagemid:
 *                 type: string
 *                 format: uuid
 *                 description: ID do personagem
 *                 example: b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7
 *               classeid:
 *                 type: string
 *                 format: uuid
 *                 description: ID da classe
 *                 example: a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonagemClasseResponseDto'
 *       400:
 *         description: Dados inválidos ou classe já associada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Classe ou personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/firstlevel', authMiddleware, personagemClasseController.firstLevel.bind(personagemClasseController));

export default router;