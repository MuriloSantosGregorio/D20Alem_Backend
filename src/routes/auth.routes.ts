import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       400:
 *         description: Email já está em uso
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register', authController.register.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *                 user:
 *                   $ref: '#/components/schemas/UserResponseDto'
 *       401:
 *         description: Credenciais inválidas
 *       403:
 *         description: Usuário desativado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', authController.login.bind(authController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Desloga o usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/logout', authController.logout.bind(authController));

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/profile', authController.getProfile.bind(authController));

export default router;