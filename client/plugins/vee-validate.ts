import Vue from 'vue';
import VeeValidate from 'vee-validate';

const dictionary = {
  en: {
    messages: {
      required: (fieldName: string) => `Enter ${fieldName}`,
    },
  },
};

Vue.use(VeeValidate, { dictionary });
