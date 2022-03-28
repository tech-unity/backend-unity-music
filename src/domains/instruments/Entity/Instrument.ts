import { randomUUID } from 'crypto';
import CreateInstrumentException from '../Exceptions/CreateInstrumentException';

export interface InstrumentProps {
  id?: string;
  name: string;
}

export default class Instrument {
  private id: string;
  private name: string;

  constructor(props: InstrumentProps) {
    this.id = props.id || randomUUID();
    this.name = props.name;

    this.validate();
  }

  validate() {
    if (!this.name) throw new CreateInstrumentException('Name is required');
    if (this.name.trim.length === 0)
      throw new CreateInstrumentException('Name may not be empty');
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }
}
