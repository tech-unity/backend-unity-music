import { Router } from 'express';
import InMemoryInstrumentRepository from '../../domains/instruments/Repositories/InMemoryRepository';
import InMemoryPeopleRepository from '../../domains/people/Repositories/InMemoryRepository';
import InMemoryScaleRepository from '../../domains/scales/Repositories/InMemoryRepository';
import CreateScaleUseCase from '../../domains/scales/useCases/CreateScale/CreateScaleUseCase';
import ListAllScaleUseCase from '../../domains/scales/useCases/ListAllScale/ListAllScaleUseCase';

const router = Router();

const scaleRepository = new InMemoryScaleRepository();
const peopleRepository = new InMemoryPeopleRepository();
const instrumentRepository = new InMemoryInstrumentRepository();

router.post('/scales', async (req, res, next) => {
  const createScaleUseCase = new CreateScaleUseCase(scaleRepository, peopleRepository, instrumentRepository);
  try {
    return res.json(await createScaleUseCase.execute(req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/scales', async (req, res, next) => {
  const listAllScaleUseCase = new ListAllScaleUseCase(scaleRepository);
  try {
    return res.json(await listAllScaleUseCase.execute());
  } catch (err) {
    next(err);
  }
});

export default router;