import { randomUUID } from 'crypto';
import Instrument from "../../instruments/Entity/Instrument";
import People from "../../people/Entity/People";
import CreateScaleException from "../Exceptions/CreateScaleException";

export type Band = Array<{ instrument: Instrument, person: People }>;

export interface ScaleProps {
  id: string;
  date: Date;
  band: Band;
  singers: People[];
}

export default class Scale  {
  private id: string;
  private date: Date;
  private band: Band;
  private singers: People[];

  constructor(props: ScaleProps) {
    this.id = props.id || randomUUID();
    this.date = props.date;
    this.band = props.band;
    this.singers = props.singers;

    this.validate();
  }

  private validate() {
    if (!this.id) throw new CreateScaleException('Id is required');
    if (!this.date) throw new CreateScaleException('Date is required');
    if (!this.band) throw new CreateScaleException('Band is required');
    if (!this.singers) throw new CreateScaleException('Singers is required');
  }

  get getId() {
    return this.id;
  }

  get getDate() {
    return this.date;
  }

  get getBand() {
    return this.band;
  }

  get getSingers() {
    return this.singers;
  }
}