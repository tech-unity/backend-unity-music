import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import PeopleTypeORM from '../Entity/People.typeorm';
import CreatePeopleException from '../Exceptions/CreateUserException';
import PeopleNotFoundException from '../Exceptions/PeopleNotFoundException';
import IPeopleRepository from './IPeopleRepository';

export default class PostgresPeopleRepository implements IPeopleRepository {
  private repository: Repository<PeopleTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(PeopleTypeORM);
  }

  async create(people: PeopleTypeORM): Promise<PeopleTypeORM> {
    return await this.repository.save(people);
  }
  async findAll(): Promise<PeopleTypeORM[]> {
    return await this.repository.find({
      relations: { instruments: true },
    });
  }

  async findById(id: string): Promise<PeopleTypeORM> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new PeopleNotFoundException(`Person of id ${id} does not exist!`);
    }
    return entity;
  }

  async findByEmail(email: string): Promise<PeopleTypeORM | null> {
    return await this.repository.findOneBy({ email });
  }
}
