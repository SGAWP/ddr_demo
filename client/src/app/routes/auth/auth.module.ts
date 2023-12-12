import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent
    ],
    entryComponents: [

    ]
})
export class AuthModule { }
