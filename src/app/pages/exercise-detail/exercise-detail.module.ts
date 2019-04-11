import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExerciseDetailPage } from './exercise-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExerciseDetailPage]
})
export class ExerciseDetailPageModule {}
