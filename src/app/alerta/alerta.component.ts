import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alerta',
  template: `
    <div class="alerta">
      {{ mensagem }}
      <button mat-icon-button (click)="fecharAlerta()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./alerta.component.css'],
})
export class AlertaComponent {
  @Input() mensagem: string = '';
  @Output() fecharAlertaEvent = new EventEmitter<void>();

  fecharAlerta() {
    this.fecharAlertaEvent.emit();
  }
}