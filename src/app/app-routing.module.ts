import { ManageAdminModule } from './features/manage-admin/manage-admin.module';
import { LayoutComponent } from './components/layout/layout.component';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KysGuard } from './core/auth/kys.guard';

const routes: Routes = [
  {
    path: '', component:LoginComponent
  },
  {
path:'login', component:LoginComponent
  },

  {
    canActivate:[KysGuard],
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'books',
        loadChildren: () =>
          import('./features/books/books.module').then((m) => m.BooksModule),
      },

      {
        canActivate:[KysGuard],
        path: 'subscription',
        loadChildren: () =>
          import('./features/subscription/subscription.module').then(
            (m) => m.SubscriptionModule
          ),
      },

      {
        canActivate:[KysGuard],
        path: 'user',
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },

      {
        canActivate:[KysGuard],
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        canActivate:[KysGuard],
        path: 'plans',
        loadChildren: () =>
          import('./features/plains/plains.module').then(
            (m) => m.PlainsModule
          ),
      },

      {
        canActivate:[KysGuard],
        path: 'account',
        loadChildren: () =>
          import('./features/account/account.module').then(
            (m) => m.AccountModule
          ),
      },

      {
        canActivate:[KysGuard],
        path: 'admin',
        loadChildren: () =>
          import('./features/manage-admin/manage-admin.module').then(
            (m) => m.ManageAdminModule
          ),
      },

      {
        canActivate:[KysGuard],
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
