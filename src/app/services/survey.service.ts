import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private surveys$ = new BehaviorSubject<IQuestion[]>([]);

  readonly survey = this.surveys$.asObservable();

  constructor() {
    const defaultSurvey: IQuestion[] = [
      {
        id: 'dccb6078-19eb-41f6-b403-651dc79344c8',
        label: 'Which library used?',
        description: 'Library confirmation',
        isRequired: false,
        type: 'single',
        options: ['Material', 'Bootstrap', 'Tailwind UI'],
        textAnswer: null,
      },
      {
        id: 'b4ff8401-cfc8-4b13-b813-5fe91d292bed',
        label: 'Which library is fav?',
        description: 'Fav library confirmation',
        isRequired: true,
        type: 'multi',
        options: ['Angular Material', 'Bootstrap', 'Prime NG', 'Custom'],
        textAnswer: null,
      },
      {
        id: '7570894e-b4b9-4a13-be2b-ed4b3be12c7b',
        label: 'What is your gender?',
        description: 'Gender confirmation',
        isRequired: false,
        type: 'single',
        options: ['Male', 'Female', 'Other'],
        textAnswer: null,
      },
      {
        id: '7062180a-99aa-4052-a94c-74072fd8caba',
        label: 'Who is your fav author?',
        description: 'Enter name of your fav author',
        isRequired: true,
        type: 'text',
        options: [],
        textAnswer: null,
      },
    ];
    this.surveys$.next(defaultSurvey);
  }

  setSurveyData(survey: IQuestion[]) {
    this.surveys$.next(survey);
  }

  getSurveyData(): Observable<IQuestion[]> {
    return of([]);
  }
}
