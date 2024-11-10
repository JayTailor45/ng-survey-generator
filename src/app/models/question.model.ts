export type IQuestion = {
  id: string | null | undefined;
  label: string | null | undefined;
  description: string | null | undefined;
  isRequired: boolean | null | undefined;
  type: QuestionType | undefined;
  options: string[];
};

export type QuestionType = 'text' | 'single' | 'multi';
