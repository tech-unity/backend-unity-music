import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import Instrument from '../../instruments/Entity/Instrument';
import InstrumentTypeORM from '../../instruments/Entity/Instrument.typeorm';
import People, { Gender } from '../Entity/People';
import PeopleTypeORM from '../Entity/People.typeorm';
import CreatePeopleException from '../Exceptions/CreateUserException';
import PeopleNotFoundException from '../Exceptions/PeopleNotFoundException';
import IPeopleRepository from './IPeopleRepository';

export default class PostgresPeopleRepository implements IPeopleRepository {
  private repository: Repository<PeopleTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(PeopleTypeORM);
  }

  async create(people: People): Promise<any> {
    const foundId = await this.repository.findOneBy({ id: people.getId });
    if (foundId) {
      throw new CreatePeopleException('Instrument already exists');
    }

    const entity = new PeopleTypeORM();
    entity.id = people.getId;
    entity.name = people.getName;
    entity.email = people.getEmail;
    entity.phone = people.getPhone;
    entity.gender = people.getGender;
    entity.isMinister = people.getIsMinister;

    await this.repository.save(entity);

    return new People({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      gender: entity.gender as Gender,
      isMinister: entity.isMinister
    });
  }
  async findAll(): Promise<any> {
    const response = await this.repository.find();
    return response.map(entity => {
      return new People({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        gender: entity.gender as Gender,
        isMinister: entity.isMinister,
        instruments: entity.instruments?.map(
          e => new Instrument({ id: e.id, name: e.name })
        ),
      });
    });
  }

  async findById(id: string): Promise<People> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new PeopleNotFoundException(`Person of id ${id} does not exist!`);
    }
    return new People({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      gender: entity.gender as Gender,
      isMinister: entity.isMinister,
      instruments: entity.instruments?.map(
        e => new Instrument({ id: e.id, name: e.name })
      ),
    });
  }
}
