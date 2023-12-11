// vizualizar-aluno.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-vizualizar-aluno',
  templateUrl: './vizualizar-aluno.component.html',
  styleUrls: ['./vizualizar-aluno.component.css'],
})
export class VizualizarAlunoComponent implements OnInit {
  aluno: Aluno | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.obterDetalhesAluno();
  }

  obterDetalhesAluno(): void {
    const alunoId: number = +this.route.snapshot.paramMap.get('id')!;
    this.alunoService.obterAlunoPorId(alunoId).subscribe((aluno: Aluno) => {
      // Certifique-se de que aluno.nascimento é um objeto Date ou uma string no formato de data adequado.
      aluno.nascimento = new Date(aluno.nascimento);

      this.aluno = aluno;
    });
  }

  // Corrija o nome da função para voltarParaLista
  voltarParaLista(): void {
    this.router.navigate(['/list']);
  }
}
