import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './confirm-account/confirm-account.component';
import { SignUpComponent } from './signup/components/signup.component';

const routes: Routes = [
    {
        path: 'signup', component: SignUpComponent
    },

    {
        path: 'account/confirm', component: ConfirmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
