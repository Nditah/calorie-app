import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },

  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'exercise', loadChildren: './pages/exercise/exercise.module#ExercisePageModule', canActivate: [AuthGuard] },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule', canActivate: [AuthGuard] },
  { path: 'log', loadChildren: './pages/log/log.module#LogPageModule', canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule', canActivate: [AuthGuard] },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule', canActivate: [AuthGuard] },
  { path: 'food', loadChildren: './pages/food/food.module#FoodPageModule', canActivate: [AuthGuard] },
  { path: 'food-detail/:id', loadChildren: './pages/food-detail/food-detail.module#FoodDetailPageModule' },
  { path: 'food-edit/:id', loadChildren: './pages/food-edit/food-edit.module#FoodEditPageModule' },
  { path: 'food-add', loadChildren: './pages/food-add/food-add.module#FoodAddPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
