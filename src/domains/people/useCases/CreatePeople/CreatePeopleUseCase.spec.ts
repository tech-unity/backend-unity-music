import CreatePeopleUseCase from './CreatePeopleUseCase';

describe('CreatePeopleUseCase', () => {
  it('should create a person', () => {
    const createPeopleUseCase = new CreatePeopleUseCase();

    const peopleProps = {
      name: 'Enzo',
      email: 'enzomoraes12@hotmail.com',
    };
    const result = createPeopleUseCase.execute(peopleProps);

    expect(result).toEqual(peopleProps);
  });
});
