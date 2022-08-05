import { Router } from 'express';
import PostgresInstrumentRepository from '../../domains/instruments/Repositories/PostgresRepository';
import PostgresPeopleRepository from '../../domains/people/Repositories/PostgresRepository';
import PostgresScaleRepository from '../../domains/scales/Repositories/PostgresRepository';
import CreateScaleUseCase from '../../domains/scales/UseCases/CreateScale/create';
import ListAllScaleUseCase from '../../domains/scales/UseCases/ListAllScale/listAll';
import CreateValidator from '../../domains/scales/Validations/createValidator';

const router = Router();

const scaleRepository = new PostgresScaleRepository();
const peopleRepository = new PostgresPeopleRepository();
const instrumentRepository = new PostgresInstrumentRepository();
const createValidator = new CreateValidator(scaleRepository);

const createScaleUseCase = new CreateScaleUseCase(
  scaleRepository,
  peopleRepository,
  instrumentRepository,
  createValidator
);
const listAllScaleUseCase = new ListAllScaleUseCase(scaleRepository);

router.post('/scales', async (req, res, next) => {
  try {
    return res.json(await createScaleUseCase.execute(req.body));
  } catch (e) {
    next(e);
  }
});

router.get('/scales', async (req, res, next) => {
  try {
    return res.json(await listAllScaleUseCase.execute());
  } catch (e) {
    next(e);
  }
});

export default router;
