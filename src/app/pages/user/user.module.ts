import { Settings } from './../../providers/settings/settings';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  { path: '', component: UserPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
