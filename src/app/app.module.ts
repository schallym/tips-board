import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {TextInputComponent} from "./form/input/text-input.component";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PasswordInputComponent} from './form/input/password-input.component';
import {ProfileComponent} from './user/profile.component';
import {TipFormComponent} from './tips/tip-form.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {AngularMarkdownEditorModule} from 'angular-markdown-editor';
import {NgxMdModule} from 'ngx-md';
import {TipsService} from "./tips/tips.service";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-yaml';
import { TextareaInputComponent } from './form/input/textarea-input.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent,
		SignupComponent,
		SigninComponent,
		TextInputComponent,
		PasswordInputComponent,
		ProfileComponent,
		TipFormComponent,
		TextareaInputComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		AngularMarkdownEditorModule.forRoot({iconlibrary: 'fa'}),
		NgxMdModule.forRoot(),
	],
	providers: [
		AuthService,
		AuthGuardService,
		TipsService
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
