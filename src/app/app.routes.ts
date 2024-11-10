import { Routes } from '@angular/router';
import { SurveyComponent } from './components/survey/survey.component';
import { FillSurveyComponent } from './components/fill-survey/fill-survey.component';
import { LogicComponent } from './components/logic/logic.component';

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
    path: 'logic',
    component: LogicComponent,
  },
  {
    path: 'fill-survey',
    component: FillSurveyComponent,
  },
];
