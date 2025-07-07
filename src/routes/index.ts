import { Router } from 'express';
import atributoRoutes from './atributo.routes';
import authRoutes from './auth.routes';
import classeRoutes from './classe.routes';
import deusRoutes from './deus.routes';
import habilidadeRoutes from './habilidade.routes';
import magiaRoutes from './magia.routes';
import modmagiaRoutes from './modmagia.routes';
import origemRoutes from './origem.routes';
import periciaRoutes from './pericia.routes';
import personagemRoutes from './personagem.routes';
import proficienciaRoutes from './proficiencia.routes';
import racaRoutes from './raca.routes';
import tamanhoRoutes from './tamanho.routes';
import userRoutes from './user.routes';
import classehabilidadeRoutes from './classehabilidade.routes';
import classepericiaRoutes from './classepericia.routes';
import classeproficienciaRoutes from './classeproficiencia.routes';
import deusclasseRoutes from './deusclasse.routes';
import deusracaRoutes from './deusraca.routes';
import origempericiaRoutes from './origempericia.routes';
import personagematributoRoutes from './personagematributo.routes';
import personagemclasseRoutes from './personagemclasse.routes';
import personagemhabilidadeRoutes from './personagemhabilidade.routes';
import personagempericiaRoutes from './personagempericia.routes';
import personagemproficienciaRoutes from './personagemproficiencia.routes';
import racaatributoRoutes from './racaatributo.routes';
import racahabilidadeRoutes from './racahabilidade.routes';

const router = Router();

// Configuração das rotas com prefixos
router.use('/atributos', atributoRoutes);
router.use('/auth', authRoutes);
router.use('/classes', classeRoutes);
router.use('/deuses', deusRoutes);
router.use('/habilidades', habilidadeRoutes);
router.use('/magias', magiaRoutes);
router.use('/modmagias', modmagiaRoutes);
router.use('/origens', origemRoutes);
router.use('/pericias', periciaRoutes);
router.use('/proficiencias', proficienciaRoutes);
router.use('/racas', racaRoutes);
router.use('/tamanhos', tamanhoRoutes);
router.use('/users', userRoutes);

router.use('/classe-habilidades', classehabilidadeRoutes);
router.use('/classe-pericias', classepericiaRoutes);
router.use('/classe-proficiencias', classeproficienciaRoutes);
router.use('/deus-classes', deusclasseRoutes);
router.use('/deus-racas', deusracaRoutes);
router.use('/origem-pericias', origempericiaRoutes);
router.use('/raca-atributos', racaatributoRoutes);
router.use('/raca-habilidades', racahabilidadeRoutes);

router.use('/personagens', personagemRoutes);
router.use('/personagem-atributos', personagematributoRoutes);
router.use('/personagem-classes', personagemclasseRoutes);
router.use('/personagem-habilidades', personagemhabilidadeRoutes);
router.use('/personagem-pericias', personagempericiaRoutes);
router.use('/personagem-proficiencias', personagemproficienciaRoutes);


export default router;