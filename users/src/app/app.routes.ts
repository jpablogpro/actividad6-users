import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { FormComponent } from './pages/form/form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'dashboard/home'},
    {
        path: "dashboard", component: DashboardComponent, children: [
            { path: "home", component: UserListComponent},
            { path: "user/:id", component: UserViewComponent },
            { path: "newuser", component: FormComponent },
            { path: "updateuser/:id", component: FormComponent },
        ]
      },
    { path: "**", redirectTo: 'home'}
];
