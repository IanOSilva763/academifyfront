import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { IncluirAlunoComponent } from './incluir-aluno/incluir-aluno.component';
import { InicialComponent } from './inicial/inicial.component';
import { ListComponent } from './list/list.component';
import { VizualizarAlunoComponent } from './vizualizar-aluno/vizualizar-aluno.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicial', pathMatch: 'full'},
  {path: 'list', component: ListComponent},
  {path: 'incluir-aluno', component: IncluirAlunoComponent},
  {path: 'editar-aluno/:id', component: EditarAlunoComponent},
  {path: 'vizualizar-aluno', component: VizualizarAlunoComponent},
  {path: 'inicial', component: InicialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
