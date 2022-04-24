import { randomUUID } from 'crypto'
import Instrument, { InstrumentProps } from "../../../instruments/Entity/Instrument"
import InMemoryInstrumentRepository from '../../../instruments/Repositories/InMemoryRepository'
import People, { Gender, PeopleProps } from "../../../people/Entity/People"
import InMemoryPeopleRepository from '../../../people/Repositories/InMemoryRepository'
import { ScaleProps } from "../../Entity/Scale"
import InMemoryScaleRepository from "../../Repositories/InMemoryRepository"
import CreateScaleUseCase, { ScaleDTORequest } from "./CreateScaleUseCase"

describe('CreateScaleUseCase', () => {
  it('should create a scale', async () => {
    const scaleRepository = new InMemoryScaleRepository();
    const peopleRepository = new InMemoryPeopleRepository();
    const instrumentRepository = new InMemoryInstrumentRepository();
    const createScaleUseCase = new CreateScaleUseCase(scaleRepository, peopleRepository, instrumentRepository);

    const violaoProps: InstrumentProps = {
      id: randomUUID(),
      name: 'Violão',
    }
    const violao = new Instrument(violaoProps);
    instrumentRepository.create(violao);

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
    peopleRepository.create(violonista)
    const cantor = new People(cantorProps);
    peopleRepository.create(cantor)

    const band = new Array<{ instrument: string, person: string }>();
    band.push({ instrument: violao.getId, person: violonista.getId });

    const scaleProps: ScaleDTORequest = {
      id: randomUUID(),
      date: new Date(),
      band: band,
      singers: [cantor.getId]
    }

    const result = await createScaleUseCase.execute(scaleProps);

    expect(result.date).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.band).toBeDefined()
    expect(result.singers).toBeDefined()

    expect(result.singers.length).toBe(1)
    expect(result.band.length).toBe(1)

    const firstBandEntry = result.band[0]
    expect(firstBandEntry.instrument).toBe(violao)
    expect(firstBandEntry.person).toBe(violonista)
    
    const firstSingersEntry = result.singers[0]
    expect(firstSingersEntry).toBe(cantor)
  })
})