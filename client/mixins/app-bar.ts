import { APP_BAR, SET_APP_BAR_TITLE } from '@/graphql/documents';
import { AppBar } from '@/graphql/types';
import { SmartQuery } from 'vue-apollo-decorator';
import { Component, Vue } from 'vue-property-decorator';

@Component
export class AppBarMixin extends Vue {
  @SmartQuery({ query: APP_BAR, prefetch: true })
  appBar: AppBar;

  setAppBarTitle(title: string) {
    this.$apollo.mutate({
      mutation: SET_APP_BAR_TITLE,
      variables: { title },
    });
  }

  resetAppBarTitle() {
    this.$apollo.mutate({
      mutation: SET_APP_BAR_TITLE,
      variables: { title: 'Untitled' },
    });
  }

  destroyed() {
    this.resetAppBarTitle();
  }
}
