export interface Dependencia {

  id: number;
  nombre: string;
  piso: string;

  tipoDependenciaId: number;
  tipoDependenciaNombre: string;

  nivelJurisdiccionalId?: number;
  nivelJurisdiccionalNombre?: string;

  especialidadId?: number;
  especialidadNombre?: string;

  unidadAdministrativaId?: number;
  unidadAdministrativaNombre?: string;

  coordinacionId?: number;
  coordinacionNombre?: string;

  sedeJudicialId: number;
  sedeJudicialNombre: string;

  activo: string;
  fechaCreacion: string;
  horaCreacion: string;

}