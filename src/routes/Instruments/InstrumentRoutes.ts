import InMemoryInstrumentRepository from '../../domains/instruments/Repositories/InMemoryRepository';
import CreateInstrumentUseCase from '../../domains/instruments/useCases/CreateInstrument/CreateInstrumentUseCase';
import ListAllInstrumentUseCase from '../../domains/instruments/useCases/ListAllInstrument/ListAllInstrumentUseCase';
import { Router } from 'express';
import PostgresInstrumentRepository from '../../domains/instruments/Repositories/PostgresRepository';

const router = Router();

// const instrumentsRepository = new InMemoryInstrumentRepository();
const instrumentsRepository = new PostgresInstrumentRepository();

// Rota post - para criar o instrumento
router.post('/instruments', async (req, res, next) => {
  const createInstrumentUseCase = new CreateInstrumentUseCase(
    instrumentsRepository
  );

  try {
    res.json(await createInstrumentUseCase.execute(req.body));
  } catch (err) {
    next(err);
  }
});

// Rota get - para listar os instrumentos
router.get('/instruments', async (req, res, next) => {
  const listAllInstrumentUseCase = new ListAllInstrumentUseCase(
    instrumentsRepository
  );

  try {
    res.json(await listAllInstrumentUseCase.execute());
  } catch (err) {
    next(err);
  }
});

export default router;
