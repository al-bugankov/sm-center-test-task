import { defineStore } from 'pinia';
import { useFeedbackStore } from "@/modules/feedback/store/feedbackStore.ts";
import type { IFormSettings } from "@/components/form-generator/types/IFormSettings.ts"
import type { IFormStoreState } from "@/components/form-generator/types/IFormStoreState.ts";

export const useFormStore = defineStore('form', {
  state: () :IFormStoreState => ({
    customFormBgColor: '',
    formSettings: {} as IFormSettings,
    isPageFormGenerator: false,
    formType: '',
  }),
  actions: {
    saveFormData(formSettings: IFormSettings, customFormBgColor:string, formType:string) {
      const feedbackStore = useFeedbackStore()
      feedbackStore.isGlobalLoading = true;
      this.formSettings = formSettings;
      this.customFormBgColor = customFormBgColor;
      this.formType = formType
      this.isPageFormGenerator = true;
      feedbackStore.isGlobalLoading = false;
      feedbackStore.showToast({
        type: 'success',
        title: 'Вам улыбнулась удача',
        message: 'Форма успешно сохранена',
      })
    },
  },
});
