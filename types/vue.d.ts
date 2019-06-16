import { ErrorBag, FieldBag } from 'vee-validate';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    fields: FieldBag;
    errors: ErrorBag;
  }

  interface VueConstructor {}
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {}
}
