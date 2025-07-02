import { Routes } from '@angular/router';
import { Comparison } from './comparison/comparison';
import { Selection } from './selection/selection';

export const routes: Routes = [
    { path: 'selection', component: Selection },
    { path: 'comparison', component: Comparison },
    { path: '', redirectTo: '/selection', pathMatch: 'full'},
    { path: '**', redirectTo: '/selection' }
];
