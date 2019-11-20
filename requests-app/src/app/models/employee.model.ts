import { Model } from '../core/model';
import { Departament } from './departament.model';

export class Employee extends Model {
    name: string;
    function: string;
    email: string;
    lastAccess: Date;
    departament: Departament;
} 