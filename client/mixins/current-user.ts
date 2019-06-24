import { CURRENT_USER } from '@/graphql/documents';
import { User } from '@/graphql/types';
import { Component, mixins } from 'nuxt-property-decorator';
import { SmartQuery } from 'vue-apollo-decorator';

@Component
export class CurrentUserMixin extends mixins() {
  @SmartQuery({ query: CURRENT_USER, prefetch: true })
  currentUser: User;
}
