import { Router } from 'express';
import PostgresInstrumentRepository from '../../domains/instruments/Repositories/PostgresRepository';
import PostgresPeopleRepository from '../../domains/people/Repositories/PostgresRepository';
import PostgresScaleRepository from '../../domains/scales/Repositories/PostgresRepository';
import CreateScaleUseCase from '../../domains/scales/useCases/CreateScale/CreateScaleUseCase';
import ListAllScaleUseCase from '../../domains/scales/useCases/ListAllScale/ListAllScaleUseCase';

const router = Router();

// const scaleRepository = new InMemoryScaleRepository();
// const peopleRepository = new InMemoryPeopleRepository();
// const instrumentRepository = new InMemoryInstrumentRepository();

const scaleRepository = new PostgresScaleRepository();
const peopleRepository = new PostgresPeopleRepository();
const instrumentRepository = new PostgresInstrumentRepository();

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