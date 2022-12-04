import toPostgresDate from '../../utils/toPostgresDate';

export const instrumentSeed = [{ name: 'violão' }, { name: 'teclado' }];

export const personSeed = [
  {
    email: 'ministro@gmail.com',
    gender: 'M',
    isMinister: true,
    name: 'ministro',
    phone: '67988888888',
  } as any,
  {
    email: 'cantora@gmail.com',
    gender: 'F',
    isMinister: false,
    name: 'cantora',
    phone: '67977777777',
  } as any,
  {
    email: 'tecladista@gmail.com',
    gender: 'M',
    isMinister: false,
    name: 'tecladista',
    phone: '67966666666',
  } as any,
  {
    email: 'violonista@gmail.com',
    gender: 'M',
    isMinister: false,
    name: 'violonista',
    phone: '67955555555',
  } as any,
];
