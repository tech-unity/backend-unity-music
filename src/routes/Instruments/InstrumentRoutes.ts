import { Router } from 'express';
import PostgresInstrumentRepository from '../../domains/instruments/Repositories/PostgresRepository';
import CreateUseCase from '../../domains/instruments/UseCases/CreateInstrument/create';
import ListAllUseCase from '../../domains/instruments/UseCases/ListAllInstrument/listAll';
import CreateValidator from '../../domains/instruments/Validations/createValidator';

const router = Router();

const instrumentsRepository = new PostgresInstrumentRepository();
const createValidator = new CreateValidator();

const createInstrumentUseCase = new CreateUseCase(
  instrumentsRepository,
  createValidator
);
const listAllInstrumentUseCase = new ListAllUseCase(instrumentsRepository);

router.post('/instruments', async (req, res, next) => {
  try {
    res.json(await createInstrumentUseCase.execute(req.body));
  } catch (e) {
    next(e);
  }
});

router.get('/instruments', async (req, res, next) => {
  try {
    res.json(await listAllInstrumentUseCase.execute());
  } catch (e) {
    next(e);
  }
});

export default router;
