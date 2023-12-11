import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parse } from 'date-fns';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';
import { HttpClient } from '@angular/common/http';

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
    private router: Router,
    private http: HttpClient
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
      this.alunoForm.patchValue({ ...aluno });
    });
  }

  atualizarAluno() {
    const alunoId = this.route.snapshot.params['id'];  // Obtenha o ID do aluno da rota
    const alunoAtualizado = this.alunoForm.value;
  
    this.http.put(`http://localhost:8080/api/aluno/editar/${alunoId}`, alunoAtualizado)
      .subscribe(
        (response) => {
          console.log('Aluno atualizado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao atualizar aluno:', error);
        }
      );
  }

  formatarDataVisualizacao(data: string | Date | null): string {
    if (!data) {
      return '';
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

