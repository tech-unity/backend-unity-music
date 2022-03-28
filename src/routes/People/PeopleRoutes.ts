import InMemoryPeopleRepository from '../../domains/people/Repositories/InMemoryRepository';
import CreatePeopleUseCase from '../../domains/people/useCases/CreatePeople/CreatePeopleUseCase';
import ListAllPeopleUseCase from '../../domains/people/useCases/ListAllPeople/ListAllPeopleUseCase';
import { Router } from 'express';

const router = Router();

const peopleRepository = new InMemoryPeopleRepository();

// Rota post - para criar a pessoa
router.post('/people', async (req, res, next) => {
  const createPeopleUseCase = new CreatePeopleUseCase(peopleRepository);
  try {
    res.json(await createPeopleUseCase.execute(req.body));
  } catch (err) {
    next(err);
  }
});

// Rota get - para listar as pessoas
router.get('/people', async (req, res, next) => {
  const listAllPeopleUseCase = new ListAllPeopleUseCase(peopleRepository);

  try {
    res.json(await listAllPeopleUseCase.execute());
  } catch (err) {
    next(err);
  }
});

export default router;
