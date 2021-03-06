import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },

  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule', canActivate: [AuthGuard] },
  { path: 'feedback-detail/:id', loadChildren: './pages/feedback-detail/feedback-detail.module#FeedbackDetailPageModule' },
  { path: 'food', loadChildren: './pages/food/food.module#FoodPageModule', canActivate: [AuthGuard] },
  { path: 'food-add', loadChildren: './pages/food-add/food-add.module#FoodAddPageModule' },
  { path: 'food-edit/:id', loadChildren: './pages/food-edit/food-edit.module#FoodEditPageModule' },
  { path: 'food-detail/:id', loadChildren: './pages/food-detail/food-detail.module#FoodDetailPageModule' },
  { path: 'exercise', loadChildren: './pages/exercise/exercise.module#ExercisePageModule', canActivate: [AuthGuard] },
  { path: 'exercise-detail/:id', loadChildren: './pages/exercise-detail/exercise-detail.module#ExerciseDetailPageModule' },
  { path: 'exercise-edit/:id', loadChildren: './pages/exercise-edit/exercise-edit.module#ExerciseEditPageModule' },
  { path: 'exercise-add', loadChildren: './pages/exercise-add/exercise-add.module#ExerciseAddPageModule' },
  { path: 'log', loadChildren: './pages/log/log.module#LogPageModule', canActivate: [AuthGuard] },
  { path: 'log-add', loadChildren: './pages/log-add/log-add.module#LogAddPageModule' },
  { path: 'log-detail/:id', loadChildren: './pages/log-detail/log-detail.module#LogDetailPageModule' },
  { path: 'minivite', loadChildren: './pages/minivite/minivite.module#MinivitePageModule' },
  { path: 'minivite-detail/:id', loadChildren: './pages/minivite-detail/minivite-detail.module#MiniviteDetailPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule', canActivate: [AuthGuard] },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule', canActivate: [AuthGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
