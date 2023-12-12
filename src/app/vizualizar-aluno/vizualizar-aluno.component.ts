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
      aluno.nascimento = new Date(aluno.nascimento);

      this.aluno = aluno;
    });
  }

  voltarParaLista(): void {
    this.router.navigate(['/list']);
  }
}
