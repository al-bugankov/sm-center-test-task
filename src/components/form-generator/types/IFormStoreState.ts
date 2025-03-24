import type { IFormSettings } from "@/components/form-generator/types/IFormSettings.ts"

export interface IFormStoreState {
  customFormBgColor: string,
  formSettings: IFormSettings,
  isPageFormGenerator: boolean,
  formType: string,
}
