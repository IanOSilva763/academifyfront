import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from './aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/aluno';

  constructor(private http: HttpClient) { }

  // LISTAR ALUNOS
  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/listar`);
  }
  // CADASTRAR NOVO ALUNO
  criarAluno(alunoData: any): Observable<any> {
    // Lógica para enviar os dados do aluno para o servidor
    return this.http.post(`${this.apiUrl}/incluir`, alunoData);
  }
  // editarAluno(aluno: Aluno): Observable<Aluno> {
  //   return this.http.put<Aluno>(`${this.apiUrl}/api/aluno/editar`, aluno);
  // }
  removerAluno(alunoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${alunoId}`);
  }
  
}