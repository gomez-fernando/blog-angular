import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// importar routing y appRoutingProviders
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HomeComponent, ErrorComponent],
  // en imports se cargan los modulos
  imports: [BrowserModule, routing],
  // en providers se cargan los servicios
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
