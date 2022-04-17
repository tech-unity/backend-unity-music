import { randomUUID } from 'crypto'
import Instrument, { InstrumentProps } from "../../../instruments/Entity/Instrument"
import People, { Gender, PeopleProps } from "../../../people/Entity/People"
import { ScaleProps } from "../../Entity/Scale"
import InMemoryScaleRepository from "../../Repositories/InMemoryRepository"
import CreateScaleUseCase from "./CreateScaleUseCase"

describe('CreateScaleUseCase', () => {
  it('should create a scale', async () => {
    const scaleRepository = new InMemoryScaleRepository();
    const createScaleUseCase = new CreateScaleUseCase(scaleRepository);

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

    const result = await createScaleUseCase.execute(scaleProps);

    expect(result.getDate).toBeDefined()
    expect(result.getId).toBeDefined()
    expect(result.getBand).toBeDefined()
    expect(result.getSingers).toBeDefined()

    expect(result.getSingers.length).toBe(1)
    expect(result.getBand.size).toBe(1)

    const firstBandEntry = result.getBand.entries().next().value
    expect(firstBandEntry[0]).toBe(violao)
    expect(firstBandEntry[1]).toBe(violonista)
    
    const firstSingersEntry = result.getSingers[0]
    expect(firstSingersEntry).toBe(cantor)
  })
})