export interface InputField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  customLabel?: string;
  customPlaceholder?: string;
  customRows?: number;
  customCols?: number;
}

export interface ButtonField {
  label: string;
  customLabel: string;
  customBackgroundColor: string;
}
