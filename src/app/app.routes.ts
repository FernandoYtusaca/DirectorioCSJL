import { Routes } from '@angular/router';

import { Anexos } from './pages/anexos/anexos';
import { Login } from './pages/login/login';
import { Dependencias } from './pages/dependencias/dependencias';

export const routes: Routes = [
    //Cuando  el usuario ingrese a la Url principal
    {
        path: '',
        redirectTo: 'dependencias',
        pathMatch: 'full',
    },

    //RUTAS
    {
        path: 'dependencias',
        component: Dependencias
    },

    {
        path: 'sedes',
        loadComponent: () =>
            import('./pages/sedes/sedes')
        .then(m => m.SedesComponent)
    },

    {
        path: 'anexos',
        component: Anexos
    },

    {
        path: 'login',
        component: Login
    }
];

