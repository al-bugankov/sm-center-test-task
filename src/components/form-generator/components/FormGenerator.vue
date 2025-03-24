<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFormStore } from "@/components/form-generator/stores/useFormStore.ts";
import router from "@/router";


const route = useRoute();

const formType = route.params.formName;

const formTitle = formType === 'registration' ? 'Форма Регистрации' : 'Форма Обратной связи'

const formData = ref<Record<string, any>>({});

const fields = computed(() => {
  if (formType === 'registration') {
    return {
      inputs: [
        { name: 'username', label: 'Имя пользователя', placeholder: 'Введите имя' },
        { name: 'email', label: 'Email', placeholder: 'Введите email' },
      ],
      buttons: [
        { label: 'Submit' },
      ],
    };
  } else if (formType === 'feedback') {
    return {
      inputs: [
        { type: 'textarea', name: 'message', placeholder: 'Введите сообщение' },
      ],
      buttons: [
        { label: 'Submit' },
      ],
    };
  }
});

const goHome = () => {
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="form-gen">
    <h1 class="form-gen__title">{{ formTitle }}</h1>
    <form>
      <div class="form-gen__fields" v-for="input in fields.inputs" :key="input.name">
        <label class="form-gen__labels">{{ input.label }}</label>
        <app-input-text
          class="form-gen__input"
          v-model="formData[input.name]"
          :placeholder="input.placeholder"
        />
      </div>
        <div class="form-gen__buttons" v-for="button in fields.buttons" :key="button.label">
          <app-button class="button">{{ button.label }}</app-button>
      </div>
    </form>
    <div class="form-gen__actions-buttons">
      <app-button class="save-button" severity="success" label='Сохранить форму' />
      <app-button class="goBack-button" severity="danger" label="Вернуться на главную" @click='goHome'/>
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
  height: 100vh;
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

.form-gen__fields {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 5px;
  height: 40px;

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
  justify-content: center;
  & .button {
    background-color: $silver-grey;
    margin-top: 10px;
  }
}

.form-gen__actions-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  & .save-button {
    background-color: $green;
  }
  .goBack-button {
    background-color: $secondary-red;
  }
}
</style>
