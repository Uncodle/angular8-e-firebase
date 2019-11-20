import { Model } from '../core/model';
import { Employee } from './employee.model';

export class Movement extends Model {
    employee: Employee;
    dateHour: Date;
    status: string;
    description: string;
}