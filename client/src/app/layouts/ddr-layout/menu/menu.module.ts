import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MenuComponent } from './menu.component';
import { AccordionDirective } from './directives/accordion.directive';
import { AccordionAnchorDirective } from './directives/accordionanchor.directive';
import { AccordionLinkDirective } from './directives/accordionlink.directive';

@NgModule({
    declarations: [
        MenuComponent,
        AccordionDirective,
        AccordionAnchorDirective,
        AccordionLinkDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        MenuComponent
    ]
})
export class MenuModule { }
