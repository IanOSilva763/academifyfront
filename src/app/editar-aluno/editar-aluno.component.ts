import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parse } from 'date-fns';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css'],
})
export class EditarAlunoComponent implements OnInit {
  alunoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obterDetalhesAluno();
  }

  inicializarFormulario(): void {
    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      nascimento: ['', [Validators.required]],
    });
  }

  obterDetalhesAluno(): void {
    const alunoId: number = +this.route.snapshot.paramMap.get('id')!;
    this.alunoService.obterAlunoPorId(alunoId).subscribe((aluno: Aluno) => {
      // Não formate a data aqui, mantenha-a no formato original
      this.alunoForm.patchValue({ ...aluno });
    });
  }

  atualizarAluno(): void {
    const alunoId: number = +this.route.snapshot.paramMap.get('id')!;
    const aluno: Aluno = this.alunoForm.value;

    // Crie uma cópia do objeto aluno para não modificar o original
    const alunoAtualizado: Aluno = { ...aluno };

    this.alunoService.atualizarAluno(alunoId, alunoAtualizado).subscribe(() => {
      this.router.navigate(['/aluno-lista']);
    });
  }

  formatarDataVisualizacao(data: string | Date | null): string {
    if (!data) {
      return ''; // Ou qualquer valor padrão desejado para tratamento de nulo
    }

    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  formatarDataEnvio(data: string): string {
    const parsedDate = parse(data, 'dd/MM/yyyy', new Date());
    return format(parsedDate, 'yyyy-MM-dd');
  }
}

