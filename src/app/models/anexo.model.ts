export interface Anexo {

  id: number;

  numero: string;

  dependenciaId: number;
  dependenciaNombre?: string;

  sedeJudicialId?: number;
  sedeJudicialNombre?: string;

  tipoDependenciaId?: number;
  tipoDependenciaNombre?: string;

  nivelJurisdiccionalId?: number;
  nivelJurisdiccionalNombre?: string;

  especialidadId?: number;
  especialidadNombre?: string;

  unidadAdministrativaId?: number;
  unidadAdministrativaNombre?: string;

  coordinacionId?: number;
  coordinacionNombre?: string;


  activo: string;

  fechaCreacion?: string;

  horaCreacion?: string;

}