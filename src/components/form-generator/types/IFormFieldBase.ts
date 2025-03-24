export interface IFormFieldBase {
  name: string;
  label: string;
  type: 'input' | 'select' | 'checkbox' | 'textarea';
  attrs?: {
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    [key: string]: string | number | boolean | undefined;
  };
}

export interface IInputField extends IFormFieldBase {
  type: 'input';
}

export interface ISelectField extends IFormFieldBase {
  type: 'select';
  options: string[];
}

export interface ICheckboxField extends IFormFieldBase {
  type: 'checkbox';
}

export interface ITextareaField extends IFormFieldBase {
  type: 'textarea';
}

export type IFormField = IInputField | ISelectField | ICheckboxField | ITextareaField;

export interface IFormData {
  [key: string]: string | boolean;
}
