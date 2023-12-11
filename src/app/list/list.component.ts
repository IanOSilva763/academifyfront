import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; // Importe o Router
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'nascimento', 'dataHoraCadastro', 'acao'];
  dataSource: MatTableDataSource<Aluno> = new MatTableDataSource<Aluno>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alunoService: AlunoService, private router: Router) { } // Injete o Router no construtor

  ngAfterViewInit() {
    this.listarAlunos();
  }

  listarAlunos(): void {
    this.alunoService.listarAlunos().subscribe((alunos: Aluno[]) => {
      console.log('Dados recebidos:', alunos);
  
      alunos.forEach(aluno => {
        // Certifique-se de que aluno.nascimento é um objeto Date ou uma string no formato de data adequado.
        aluno.nascimento = new Date(aluno.nascimento);
      });
  
      this.dataSource.data = alunos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

removerAluno(aluno: Aluno): void {
  const alunoId = aluno.id as number;
  this.alunoService.removerAluno(alunoId).subscribe(() => {
    // Remover localmente da lista na interface do usuário
    this.dataSource.data = this.dataSource.data.filter((a) => a.id !== alunoId);

    // Atualizar a lista buscando novamente do servidor
    this.listarAlunos();
  });
}


  editarAluno(alunoId: number): void {
    this.router.navigate(['/editaraluno', alunoId]);
  }

  navegarParaIncluirAluno(): void {
    this.router.navigate(['incluir-aluno']);
  }
}