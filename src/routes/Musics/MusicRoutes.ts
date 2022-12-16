import { Router } from 'express';
import PostgresMusicRepository from '../../domains/musics/Repositories/PostgresRepository';
import CreateUseCase from '../../domains/musics/UseCases/CreateMusic/create';
import ListAllUseCase from '../../domains/musics/UseCases/ListAllMusic/listAll';
import CreateValidator from '../../domains/musics/Validations/createValidator';

const router = Router();

const musicsRepository = new PostgresMusicRepository();
const createValidator = new CreateValidator();

const createMusicUseCase = new CreateUseCase(musicsRepository, createValidator);
const listAllMusicUseCase = new ListAllUseCase(musicsRepository);

router.post('/musics', async (req, res, next) => {
  try {
    res.json(await createMusicUseCase.execute(req.body));
  } catch (e) {
    next(e);
  }
});

router.get('/musics', async (req, res, next) => {
  try {
    res.json(await listAllMusicUseCase.execute());
  } catch (e) {
    next(e);
  }
});

export default router;
