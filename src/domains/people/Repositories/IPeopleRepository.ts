import PeopleTypeORM from '../Entity/People.typeorm';

export default interface IPeopleRepository {
  create(people: PeopleTypeORM): Promise<PeopleTypeORM>;
  findAll(): Promise<PeopleTypeORM[]>;
  findById(id: string): Promise<PeopleTypeORM>;
  findByEmail(email: string): Promise<PeopleTypeORM | null>;
}
