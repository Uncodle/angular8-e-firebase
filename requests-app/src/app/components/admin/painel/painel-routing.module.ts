import { NgModule } from "@angular/core";
import { Routes } from '@angular/router';
import { LoginComponent } from '../../public/login/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent}
];

@NgModule({
    imports: [],
    exports: []
})
export class PainelRoutingModel {

}