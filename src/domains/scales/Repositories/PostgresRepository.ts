import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import toPostgresDate from '../../../utils/toPostgresDate';
import ScaleTypeORM, { BandTypeORM } from '../Entity/Scale.typeorm';
import IScaleRepository from './IScaleRepository';

export default class PostgresScaleRepository implements IScaleRepository {
  private repository: Repository<ScaleTypeORM>;
  private bandRepository: Repository<BandTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(ScaleTypeORM);
    this.bandRepository = AppDataSource.getRepository(BandTypeORM);
  }

  async create(scale: ScaleTypeORM): Promise<ScaleTypeORM> {
    // Garantindo que tudo ocorra numa transaction
    return this.repository.manager.transaction(async () => {
      for (const band of scale.band) {
        await this.bandRepository.save(band);
      }
      return await this.repository.save(scale);
    });
  }

  async findAll(): Promise<ScaleTypeORM[]> {
    return await this.repository.find({
      relations: {
        band: {
          instrument: true,
          person: true,
        },
        singers: true,
      },
    });
  }

  async findByDate(date: Date): Promise<ScaleTypeORM | null> {
    return await this.repository.findOneBy({
      date: toPostgresDate(date),
    });
  }
}
