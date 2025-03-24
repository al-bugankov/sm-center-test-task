import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {} as Record<string, any>, // Данные формы
  }),
  actions: {
    // Сохранение данных формы
    saveFormData(data: Record<string, any>) {
      this.formData = data;
    },
  },
});
