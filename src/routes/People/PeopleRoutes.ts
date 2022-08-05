import { Router } from 'express';
import PostgresInstrumentRepository from '../../domains/instruments/Repositories/PostgresRepository';
import PostgresPeopleRepository from '../../domains/people/Repositories/PostgresRepository';
import CreateUseCase from '../../domains/people/UseCases/CreatePeople/create';
import ListAllUseCase from '../../domains/people/UseCases/ListAllPeople/listAll';
import CreateValidator from '../../domains/people/Validations/createValidator';
const router = Router();

const peopleRepository = new PostgresPeopleRepository();
const instrumentRepository = new PostgresInstrumentRepository();
const createValidator = new CreateValidator();

const createPeopleUseCase = new CreateUseCase(
  peopleRepository,
  instrumentRepository,
  createValidator
);
const listAllPeopleUseCase = new ListAllUseCase(peopleRepository);

router.post('/people', async (req, res, next) => {
  try {
    res.json(await createPeopleUseCase.execute(req.body));
  } catch (e) {
    next(e);
  }
});

router.get('/people', async (req, res, next) => {
  try {
    res.json(await listAllPeopleUseCase.execute());
  } catch (e) {
    next(e);
  }
});

export default router;
