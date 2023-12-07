import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-incluir-aluno',
  templateUrl: './incluir-aluno.component.html',
  styleUrls: ['./incluir-aluno.component.css'],

})
export class IncluirAlunoComponent implements OnInit {
  alunoForm!: FormGroup;
  cadastroSucesso = false;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.alunoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      nascimento: ['', Validators.required],
      dataCadastro: [{ value: '', disabled: true }],
    });
  }

  salvarAluno() {
    if (this.alunoForm.valid) {
      const alunoData = this.alunoForm.value;

      // Formatar a data para o formato 'yyyy-MM-dd'
      const dataNascimentoFormatada = this.formatarData(alunoData.nascimento);
      alunoData.nascimento = dataNascimentoFormatada;

      this.alunoService.criarAluno(alunoData).subscribe(
        (response: any) => {
          console.log('Aluno salvo com sucesso:', response);
          this.cadastroSucesso = true;
        },
        (error: any) => {
          console.error('Erro ao salvar aluno:', error);
        }
      );
    }
  }

  // Função para formatar a data para 'yyyy-MM-dd'
  formatarData(data: string): string {
    const partes = data.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  fecharMensagem() {
    this.cadastroSucesso = false;
  }
}