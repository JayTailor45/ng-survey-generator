import { Routes } from '@angular/router';
import { SurveyComponent } from './components/survey/survey.component';
import { FillSurveyComponent } from './components/fill-survey/fill-survey.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'survey',
  },
  {
    path: 'survey',
    component: SurveyComponent,
  },
  {
    path: 'fill-survey',
    component: FillSurveyComponent,
  },
];
