import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SedeJudicial } from '../../../../models/sedeJudicial.model';

@Component({
    selector: 'app-modal-detalle-sede',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './modal-detalle-sede.html',
    styleUrl: './modal-detalle-sede.css'
})

export class ModalDetalleSedeComponent {
    @Input()
    sede!: SedeJudicial;

    @Input()
    nombreDistrito = '';
    
    @Output()
    cerrar = new EventEmitter<void>();
    cerrarModal(): void {
        this.cerrar.emit();
    }
}