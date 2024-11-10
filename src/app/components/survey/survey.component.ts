import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { SurveyService } from '../../services/survey.service';
import { IQuestion } from '../../models/question.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, JsonPipe],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
})
export class SurveyComponent implements OnInit {
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

  createQuestionGroupControl(createDefaultOption = false) {
    const questionFormGroup = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      label: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      isRequired: this.fb.control(false),
      type: this.fb.control('text', [Validators.required]),
      options: this.fb.array([]),
      textAnswer: this.fb.control<string[] | string | null>(null),
    });
    questionFormGroup.controls.id.patchValue(uuid());

    if (createDefaultOption) {
      questionFormGroup.controls.options.push(this.createOptionGroupControl());
    }
    return questionFormGroup;
  }

  createOptionGroupControl() {
    return this.fb.control('Option', [Validators.required]);
  }

  onNewQuestionClicked() {
    this.getQuestions().push(this.createQuestionGroupControl(true));
  }

  onNewOptionClicked(questionIndex: number) {
    this.getQuestionOptions(questionIndex).push(
      this.createOptionGroupControl()
    );
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.getQuestionOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit() {
    console.log(this.form.get('questions')?.value);
    this.surveyService.setSurveyData(this.form.get('questions')?.value);
  }
}
