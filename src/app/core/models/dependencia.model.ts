export type TipoDependencia = 'Jurisdiccional' | 'Administrativa';

export interface Dependencia {
  id: number;
  nombre: string;
  nivel: string;
  sede: string;
  tipo: TipoDependencia;
  especialidad: string;
  anexos: number;
}

/** Datos de una dependencia sin el id, usados al crear un registro nuevo. */
export type DependenciaFormData = Omit<Dependencia, 'id'>;

/** Estructura de los filtros aplicables al listado de dependencias. */
export interface FiltrosDependencia {
  sede: string;
  tipo: string;
  nombre: string;
  nivel: string;
  especialidad: string;
}

/** Métricas agregadas que alimentan los widgets del dashboard. */
export interface MetricasDependencia {
  totalJuzgados: number;
  totalUnidades: number;
  totalAnexos: number;
}
