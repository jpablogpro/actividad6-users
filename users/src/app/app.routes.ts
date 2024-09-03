import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { FormComponent } from './pages/form/form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'home'},
    { path: "home", component: UserListComponent},
    { path: "user/:id", component: UserViewComponent },
    { path: "newuser", component: FormComponent },
    { path: "updateuser/:id", component: FormComponent },
    { path: "**", redirectTo: 'home'}
];
