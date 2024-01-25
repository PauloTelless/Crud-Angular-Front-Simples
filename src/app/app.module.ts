import { FuncionariosComponent } from './componentes/funcionarios/funcionarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Funcionario } from './models/funcionario';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FuncionariosService } from './funcionarios.service';

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, FuncionariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
