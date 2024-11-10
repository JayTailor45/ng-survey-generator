import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { IQuestion } from '../../models/question.model';
import { first } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-fill-survey',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './fill-survey.component.html',
  styleUrl: './fill-survey.component.scss',
})
export class FillSurveyComponent implements OnInit {
  fb = inject(FormBuilder);
  surveyService = inject(SurveyService);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      questions: this.fb.array<IQuestion[]>([]),
    });

    this.loadSavedData();
  }

  loadSavedData() {
    this.surveyService.survey.pipe(first()).subscribe({
      next: (response) => {
        (response || []).forEach((question) => {
          const questionGroup = this.createQuestionGroupControl();

          questionGroup.patchValue({ ...question });

          questionGroup.controls.options.reset();

          if (question.textAnswer) {
            questionGroup
              .get('textAnswer')
              ?.addValidators([Validators.required]);
          }

          (question.options || []).forEach((option: string) => {
            const optionGroup = this.createOptionGroupControl();
            optionGroup.patchValue(option);
            questionGroup.controls['options'].push(optionGroup);
          });

          this.getQuestions().push(questionGroup);
        });
      },
      error: (e) => console.log(e),
      complete: () => console.log('Loading complete'),
    });
  }

  getQuestions() {
    return this.form.get('questions') as FormArray;
  }

  getQuestionOptions(questionIndex: number) {
    return (this.form.get('questions') as FormArray)
      .at(questionIndex)
      .get('options') as FormArray;
  }

  createQuestionGroupControl() {
    const questionFormGroup = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      label: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      isRequired: this.fb.control(false),
      type: this.fb.control('text', [Validators.required]),
      options: this.fb.array([]),
      textAnswer: this.fb.control<string[] | string | null>(null),
    });
    return questionFormGroup;
  }

  createOptionGroupControl() {
    return this.fb.control('', [Validators.required]);
  }

  onSubmit() {
    console.log(this.form.get('questions')?.value);
  }
}
