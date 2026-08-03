import { Routes } from '@angular/router';

import { Sedes } from './pages/sedes/sedes';
import { Anexos } from './pages/anexos/anexos';
import { Login } from './pages/login/login';
import { Dependencias } from './pages/dependencias/dependencias';

export const routes: Routes = [
    //Cuando  el usuario ingrese a la Url principal
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },

    //RUTAS
    {
        path: 'dependencias',
        component: Dependencias
    },

    {
        path: 'sedes',
        component: Sedes
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

