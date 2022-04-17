import Instrument from "../../instruments/Entity/Instrument";
import People from "../../people/Entity/People";
import { randomUUID } from 'crypto';
import CreateScaleException from "../Exceptions/CreateScaleException";

export interface ScaleProps {
  id: string;
  date: Date;
  band: Map<Instrument, People>;
  singers: People[];
}

export default class Scale  {
  private id: string;
  private date: Date;
  private band: Map<Instrument, People>;
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