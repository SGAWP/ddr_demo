import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment.prod';
import { RoleGuard } from "../shared/classes/role.guard";
import { AuthGuard } from "../shared/classes/auth.guard";
import { PreventLoggedInAccess } from "../shared/classes/prevent-logged-in.access";
import { DDRLayoutComponent } from '../layouts/ddr-layout/ddr-layout.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DDRLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'svod', pathMatch: 'full' },
      {
        path: "planned_data/teams",
        loadChildren: () => import("./planned-sinking/planned-sinking.module").then(m => m.PlannedSinkingModule)
      },
      {
        path: 'planned_data/ubr',
        loadChildren: () => import("./planned-data-ubr/planned-data-ubr.module").then(m => m.PlannedDataUBRModule)
      },
      {
        path: 'planned_data/well',
        loadChildren: () => import("./planned-data-well/planned-data-well.module").then(m => m.PlannedDataWellModule)
      },
      {
        path: 'users',
        loadChildren: () => import("./users/users.module").then(m => m.UsersModule),
        data: { role_name: ["Администратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'svod',
        loadChildren: () => import("./svod/svod.module").then(m => m.SvodModule)
      },
      {
        path: 'new-svod',
        loadChildren: () => import("./new-svod/new-svod.module").then(m => m.NewSvodModule)
      },
      {
        path: "svod/:id",
        loadChildren: () => import("./svod/svod-form/svod-form.module").then(m => m.SvodFormModule)
      },
      {
        path: 'directories/teams',
        loadChildren: () => import("./teams/teams.module").then(m => m.TeamsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/masters',
        loadChildren: () => import("./masters/masters.module").then(m => m.MastersModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/drillrigs',
        loadChildren: () => import("./drillrigs/drillrigs.module").then(m => m.DrillrigsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/well_purposes',
        loadChildren: () => import("./well-purposes/well-purposes.module").then(m => m.WellPurposesModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/oilfields',
        loadChildren: () => import("./oilfields/oilfields.module").then(m => m.OilfieldsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/wellplatforms',
        loadChildren: () => import("./wellplatforms/wellplatforms.module").then(m => m.WellplatformsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/bits',
        loadChildren: () => import("./bits/bits.module").then(m => m.BitsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/turbodrills',
        loadChildren: () => import("./turbodrills/turbodrills.module").then(m => m.TurbodrillsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/operations',
        loadChildren: () => import("./operations/operations.module").then(m => m.OperationsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/requests',
        loadChildren: () => import("./spr-requests/spr-requests.module").then(m => m.SprRequestsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/types',
        loadChildren: () => import("./types/types.module").then(m => m.TypesModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/type_spindles',
        loadChildren: () => import("./type-spindles/type-spindles.module").then(m => m.TypeSpindlesModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/type_calibrators',
        loadChildren: () => import("./type-calibrators/type-calibrators.module").then(m => m.TypeCalibratorsModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/customers',
        loadChildren: () => import("./customers/customers.module").then(m => m.CustomersModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      },
      {
        path: 'directories/technology',
        loadChildren: () => import("./technologies/technologies.module").then(m => m.TechnologiesModule),
        data: { role_name: ["Администратор", "Куратор"] },
        canActivate: [RoleGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [PreventLoggedInAccess],
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import("./not-found/not-found.module").then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
