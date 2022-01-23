import ListAllPeople from './ListAllPeople';

describe('ListAllPeople', () => {
  it('should list all people', () => {
    const ListAllPeopleUseCase = new ListAllPeople();
    ListAllPeopleUseCase.execute();
  });
});
