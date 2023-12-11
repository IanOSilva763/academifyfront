import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFormatDirective } from './DateFormatDirective';
import { AlertaComponent } from './alerta/alerta.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { IncluirAlunoComponent } from './incluir-aluno/incluir-aluno.component';
import { InicialComponent } from './inicial/inicial.component';
import { ListComponent } from './list/list.component';
import { TopoComponent } from './topo/topo.component';
import { VizualizarAlunoComponent } from './vizualizar-aluno/vizualizar-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    IncluirAlunoComponent,
    EditarAlunoComponent,
    VizualizarAlunoComponent,
    DateFormatDirective,
    AlertaComponent,
    TopoComponent,
    InicialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
