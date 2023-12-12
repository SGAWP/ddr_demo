import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users.routing';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
    imports: [
        SharedModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        AddUserComponent,
        EditUserComponent,
        UpdatePasswordComponent
    ],
    entryComponents: [
        AddUserComponent,
        EditUserComponent
    ]
})
export class UsersModule { }
