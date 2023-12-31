import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { SnackbarComponent } from '../components/common/snackbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { HeaderComponent } from '../components/header/header.component';
import { ButtonComponent } from 'src/components/common/button.component';
import { InputFieldComponent } from 'src/components/common/input-field.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    LoginComponent,
    SnackbarComponent,
    ButtonComponent,
    HeaderComponent,
    InputFieldComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
