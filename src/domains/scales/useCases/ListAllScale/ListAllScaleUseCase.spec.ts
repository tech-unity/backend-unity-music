import { randomUUID } from 'crypto';
import Instrument, { InstrumentProps } from "../../../instruments/Entity/Instrument";
import People, { Gender, PeopleProps } from "../../../people/Entity/People";
import Scale, { ScaleProps } from "../../Entity/Scale";
import InMemoryScaleRepository from "../../Repositories/InMemoryRepository";
import ListAllScaleUseCase from "../ListAllScale/ListAllScaleUseCase";

describe('ListAllScaleUseCase', () => {
  it('should list all scales', async () => {
    const scaleRepository = new InMemoryScaleRepository();
    const listAllScaleUseCase = new ListAllScaleUseCase(scaleRepository);

    const violaoProps: InstrumentProps = {
      id: randomUUID(),
      name: 'Violão',
    }
    const violao = new Instrument(violaoProps);

    const violonistaProps: PeopleProps = {
      id: randomUUID(),
      name: 'Enzo Violonista',
      email: 'email@teste.com',
      gender: 'M' as Gender,
      isMinister: false,
      instruments: [violao],
      phone: '67123456789'
    }

    const cantorProps: PeopleProps = {
      id: randomUUID(),
      name: 'Enzo Cantor',
      email: 'email@teste.com',
      gender: 'M' as Gender,
      isMinister: true,
      instruments: [],
      phone: '67123456789'
    }
    
    const violonista = new People(violonistaProps);
    const cantor = new People(cantorProps);

    const mapBand = new Map<Instrument, People>();
    mapBand.set(violao, violonista);

    const scaleProps: ScaleProps = {
      id: randomUUID(),
      date: new Date(),
      band: mapBand,
      singers: [cantor]
    }

    await scaleRepository.create(new Scale(scaleProps));
    const result = await listAllScaleUseCase.execute()

    expect(result.length).toBe(1)
  })
})