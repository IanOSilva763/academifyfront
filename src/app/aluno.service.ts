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

  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/listar`);
  }
  criarAluno(alunoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/incluir`, alunoData);
  }
  atualizarAluno(alunoId: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/editar/${alunoId}`, aluno);
  }
  obterAlunoPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/get/${id}`);
  }
  removerAluno(id: number): Observable<void> {
    const url = `${this.apiUrl}/remover`;

    return this.http.post<void>(url, { id });
  }

}
