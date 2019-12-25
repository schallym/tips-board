import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {ProfileComponent} from './user/profile.component';
import {TipFormComponent} from "./tips/tip-form.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'auth/signup', component: SignupComponent},
	{path: 'auth/signin', component: SigninComponent},
	{path: 'user/profile', component: ProfileComponent},
	{path: 'tips/new', canActivate: [AuthGuardService], component: TipFormComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: '**', redirectTo: 'home'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
