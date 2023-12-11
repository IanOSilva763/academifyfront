import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {

  constructor(public ngControl: NgControl, private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const cursorPosition = input.selectionStart;

    let unformattedValue = input.value.replace(/\D/g, '');
    if (unformattedValue.length > 8) {
      unformattedValue = unformattedValue.substring(0, 8);
    }

    const formattedDate = this.formatDate(unformattedValue);

    this.ngControl.control?.setValue(formattedDate, { emitEvent: false });
    
    // Restaura a posição do cursor
    input.setSelectionRange(cursorPosition, cursorPosition);
  }

  private formatDate(input: string): string {
    const numericInput = input.replace(/\D/g, '');

    const formattedDate = numericInput
      .replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3')
      .replace(/^(\d{2})(\d{2})(\d{4})(\d+)?$/, '$1/$2/$3');

    return formattedDate.slice(0, 10);
  }
}