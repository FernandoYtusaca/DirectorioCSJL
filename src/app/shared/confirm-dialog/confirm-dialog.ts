import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialogComponent {

  @Input()
  titulo: string = 'Confirmar acción';

  @Input()
  mensaje: string = '¿Está seguro de continuar?';

  @Input()
  textoCancelar: string = 'Cancelar';

  @Input()
  textoConfirmar: string = 'Confirmar';


  @Output()
  confirmado = new EventEmitter<void>();

  @Output()
  cancelado = new EventEmitter<void>();


  confirmar(): void {

    this.confirmado.emit();

  }


  cancelar(): void {

    this.cancelado.emit();

  }

}