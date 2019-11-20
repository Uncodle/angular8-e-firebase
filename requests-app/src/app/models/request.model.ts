import { Departament } from './departament.model';
import { Movement } from './movement.model';
import { Model } from './../core/model';

export class Request extends Model {
    requester: string;
    openingDate: any;
    lastUpdate: any;
    description: string;
    status: string;
    destination: string;
    movements: Movement[];

}