<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFormStore } from "@/components/form-generator/stores/useFormStore.ts";
import { useFeedbackStore } from "@/modules/feedback/store/feedbackStore.ts";
import router from "@/router";

import HomeButton from "@/components/home-button/HomeButton.vue";

import type { IFormSettings } from "@/components/form-generator/types/IFormSettings.ts"

import { ERouteNames } from '@/router/ERouteNames.ts'


const props = defineProps<{
  fields?: IFormSettings;
  customFormBgColor?: string;
  formType?: string;
  isPageFormGenerator?: boolean;
}>();

const route = useRoute();
const formStore = useFormStore();
const feedbackStore = useFeedbackStore();

const isCustomizationMode = ref(false);

const isPageFormGenerator = ref(props.isPageFormGenerator);

const customFormBgColor = ref(props.customFormBgColor ?? '');

const formType = props.formType || String(route.params.formName);

const formTitle = formType === 'registration' ? 'Форма Регистрации' : 'Форма Обратной связи'

const fields = ref<IFormSettings>(props.fields ?? (
  formType === 'registration'
    ? {
      inputs: [
        {
          name: 'username',
          label: 'Имя пользователя',
          placeholder: 'Введите имя',
          customLabel: '',
          customPlaceholder: '',
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Введите email',
          customLabel: '',
          customPlaceholder: '',
        },
      ],
      buttons: [
        {
          label: 'Submit',
          customLabel: '',
          customBackgroundColor: '',
        },
      ],
    }
    : {
      inputs: [
        {
          type: 'textarea',
          label: 'Ждем Ваш отзыв о генераторе форм!',
          name: 'message',
          placeholder: 'Ваш отзыв...',
          customLabel: '',
          customPlaceholder: '',
          customRows: 0,
          customCols: 0,
        },
      ],
      buttons: [
        {
          label: 'Submit',
          customLabel: '',
          customBackgroundColor: '',
        },
      ],
    }
));

const saveForm = (formSettings: IFormSettings, customFormBgColor: string, formType: string) => {
  formStore.saveFormData(formSettings, customFormBgColor, formType);
  router.push({ name: ERouteNames.OUTPUT });
}

const showToast = () => {
  feedbackStore.showToast({
    type: 'error',
    title: 'Упс!',
    message: 'Тут у нас заглушка!',
  })
}
</script>

<template>
  <div class="form-gen">
    <h1 class="form-gen__title">{{ formTitle }}</h1>
    <!-- Переключатель режима кастомизации -->
    <div v-if="!isPageFormGenerator" class="form-gen__customization-toggle">
      <label>
        <input type="checkbox" v-model="isCustomizationMode" />
        Режим кастомизации
      </label>
    </div>
    <form :style="{ backgroundColor: customFormBgColor ? customFormBgColor : '#363232' }">
      <!-- Кастомизация фона формы -->
      <div v-show="isCustomizationMode" class="form-gen__custom-form-color-container">
        <label class="custom-form-color__color-picker-label" for="form-color">Выберите цвет фона Формы</label>
        <input class="custom-form-color__color-picker" type="color" v-model="customFormBgColor" placeholder="Выберите цвет фона" id="form-color"/>
      </div>
      <!-- Кастомизация фона формы конец блока-->
      <div class="form-gen__fields" v-for="input in fields.inputs" :key="input.name">
        <!-- Отрисовка инпутов и лейблов -->
        <div class="form-gen__field-wrapper">
          <div
            class="form-gen__field-content"
            :class="{ 'form-gen__field-content--column': formType !== 'registration' }"
          >
            <label class="form-gen__labels">{{ input.customLabel || input.label }}</label>
            <app-input-text
              v-if="formType === 'registration'"
              class="form-gen__input"

              :placeholder="input.customPlaceholder || input.placeholder"
            />
            <app-textarea
              v-else
              class="form-gen__input-textarea"
              :placeholder="input.customPlaceholder || input.placeholder"
              :rows="input.customRows ? input.customRows : 5"
              :cols="input.customCols ? input.customRows : 40"
            />
          </div>
          <!-- Поля для кастомизации (только в режиме кастомизации) -->
          <div v-if="isCustomizationMode" class="form-gen__customization-options">
            <app-input-text class="form-gen__custom-input" :placeholder="`Новый label для  - ${input.label}:`" v-model="input.customLabel" />
            <app-input-text class="form-gen__custom-input" :placeholder="`Новый placeholder для - ${input.label}:`" v-model="input.customPlaceholder" />
          </div>
        </div>
        <!-- Отрисовка инпутов и лейблов конец блока-->
      </div>

      <!-- Отрисовка и кастомизация кнопок -->
      <div class="form-gen__buttons" v-for="button in fields.buttons" :key="button.label">
        <!-- Отрисовка кнопки -->
        <app-button
          class="button"
          :style="{ backgroundColor: button.customBackgroundColor || '#E5E5E5'}"
          @click="showToast"
        >
          {{ button.label }}
        </app-button>
        <!-- Отрисовка кнопки конец блока-->
        <!-- Поля для кастомизации (только в режиме кастомизации) -->
        <div v-if="isCustomizationMode" class="form-gen__customization-options-button">
          <label class="customization-options-button__label">Выберите цвет для кнопки {{ button.label }}:</label>
          <input class="customization-options-button__input" type="color" v-model="button.customBackgroundColor" />
        </div>
        <!-- Поля для кастомизации (только в режиме кастомизации) конец блока-->
      </div>
    </form>

    <div v-if="!isPageFormGenerator" class="form-gen__actions-buttons">
      <app-button class="save-button" severity="success" label='Сохранить форму' @click="saveForm(fields, customFormBgColor, formType)"/>
      <home-button />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/main.scss";

.form-gen {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: $black-brown;
  padding-top: 40px;
}

form {
  border: 1px solid $black;
  border-radius: 16px;
  padding: 16px;
  margin-block: 10px;
}

.form-gen__title {
  font-family: Roboto-Medium, sans-serif;
  letter-spacing: 1.5px;
}

.form-gen__field-wrapper {
  display: flex;
  flex-direction: column;
  &::placeholder {
    padding-left: 5px;
  }
}

.form-gen__labels {
  display: flex;
  align-items: center;
  font-family: Roboto-Medium, sans-serif;
  font-size: 16px;
}

.form-gen__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .button {
    margin-top: 10px;
    align-self: center;
    padding: 8px 16px;
  }
}

.form-gen__actions-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  & .save-button {
    background-color: $green;
  }
}

.form-gen__customization-toggle {
  font-family: Roboto, sans-serif;
  display: flex;
  align-items: center;
  margin-block: 10px;
}

.form-gen__custom-form-color-container {
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  color: $silver-grey;
  margin-bottom: 10px;
 & .custom-form-color__color-picker {
   margin-left: 10px;
 }
}

.form-gen__customization-options {
  display: flex;
  flex-direction: column;
}

.form-gen__customization-options-button {
  display: flex;
  align-items: center;
  justify-content: center;

  & .customization-options-button__input {
    margin-left: 10px;
  }
}

.form-gen__field-content {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 5px;

  &--column {
    flex-direction: column;
    align-items: center;
  }
}

.form-gen__custom-input {
  background-color: $dark-grey;
  margin-bottom: 5px;
}
</style>
