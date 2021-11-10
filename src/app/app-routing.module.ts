import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { kysGuard } from './core/auth/kys.guard';


const routes: Routes = [
  {
    path: '', component:LoginComponent
  },
  {
path:'login', component:LoginComponent
  },

  {
    canActivate:[kysGuard],
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'books',
        loadChildren: () =>
          import('./features/books/books.module').then((m) => m.BooksModule),
      },

      {
        canActivate:[kysGuard],
        path: 'subscription',
        loadChildren: () =>
          import('./features/subscription/subscription.module').then(
            (m) => m.SubscriptionModule
          ),
      },

      {
        canActivate:[kysGuard],
        path: 'user',
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },

      {
        canActivate:[kysGuard],
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        canActivate:[kysGuard],
        path: 'plans',
        loadChildren: () =>
          import('./features/plains/plains.module').then(
            (m) => m.PlainsModule
          ),
      },

      {
        canActivate:[kysGuard],
        path: 'account',
        loadChildren: () =>
          import('./features/account/account.module').then(
            (m) => m.AccountModule
          ),
      },

      {
        canActivate:[kysGuard],
        path: 'admin',
        loadChildren: () =>
          import('./features/manage-admin/manage-admin.module').then(
            (m) => m.ManageAdminModule
          ),
      },

      {
        canActivate:[kysGuard],
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      
      {
        canActivate:[kysGuard],
        path: 'upload',
        loadChildren: () =>
          import('./features/upload/upload.module').then(
            (m) => m.UploadModule
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
