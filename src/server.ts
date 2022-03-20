import express from 'express';
import InMemoryPeopleRepository from './domains/people/Repositories/InMemoryRepository';
import CreatePeopleUseCase from './domains/people/useCases/CreatePeople/CreatePeopleUseCase';
import ListAllPeopleUseCase from './domains/people/useCases/ListAllPeople/ListAllPeopleUseCase';

const app = express();

app.use(express.json());

const peopleRepository = new InMemoryPeopleRepository();

// Rota post - para criar o usuario
app.post('/people', async (req, res, next) => {
  const createPeopleUseCase = new CreatePeopleUseCase(peopleRepository);
  console.log(peopleRepository.findAll());

  res.json(await createPeopleUseCase.execute(req.body));
});

// Rota get - para listar os usuarios
app.get('/people', async (req, res, next) => {
  const listAllPeopleUseCase = new ListAllPeopleUseCase(peopleRepository);

  res.json(await listAllPeopleUseCase.execute());
});

// Middleware de erros padrao do express
app.use((error: any, req: any, res: any, next: any) => {
  const status = error.statusCode || 500;
  const message = !error.message ? 'Internal Error' : error.message;
  // const stack = error.stack;
  res.status(status).json({ message: message });
});

app.listen(3000, () => console.log('server is running'));
