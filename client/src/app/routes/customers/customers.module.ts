import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomersRoutingModule } from './customers.routing';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

@NgModule({
    imports: [
        SharedModule,
        CustomersRoutingModule
    ],
    declarations: [
        CustomersComponent,
        AddCustomerComponent,
        EditCustomerComponent
    ],
    entryComponents: [
        AddCustomerComponent,
        EditCustomerComponent
    ]
})
export class CustomersModule { }
