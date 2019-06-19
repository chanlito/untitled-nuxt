import VeeValidate, { PartialDictionary } from 'vee-validate';
import Vue from 'vue';

const dictionary: PartialDictionary = {
  en: {
    messages: {
      required: (fieldName: string) => `Enter ${fieldName}`,
      email: (fieldName: string) => `Enter a valid email`,
    },
  },
};

Vue.use(VeeValidate, { dictionary });
