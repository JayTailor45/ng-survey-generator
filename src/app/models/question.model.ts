export type IQuestion = {
  id: string | null | undefined;
  label: string | null | undefined;
  description: string | null | undefined;
  isRequired: boolean | null | undefined;
  type: QuestionType | undefined;
  options: string[];
  textAnswer: string[] | string | null;
};

export type QuestionType = 'text' | 'single' | 'multi';
