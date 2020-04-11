import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// importar el FormsModule para poder gernerar formularios
import { FormsModule } from '@angular/forms';
// para hacer peticiones ajax al servidor
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// importar routing y appRoutingProviders
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
  ],
  // en imports se cargan los modulos
  imports: [BrowserModule, routing, FormsModule, HttpClientModule],
  // en providers se cargan los servicios
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
