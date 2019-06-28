<template>
  <v-dialog
    v-bind="$attrs"
    scrollable
    :content-class="'modal'"
    :fullscreen="isXsOnly"
    :persistent="loading"
    v-on="$listeners"
  >
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon v-text="icon" />
      </v-btn>
    </template>

    <v-card>
      <v-card-text class="text--primary">
        <v-layout class="mb-4" align-center justify-space-between>
          <!-- Title -->
          <v-flex order-xs2>
            <span class="modal-title title " v-text="title" />
          </v-flex>

          <!-- X (Close) -->
          <v-flex order-sm2 shrink>
            <v-btn icon :disabled="loading" @click="onCancel">
              <v-icon v-text="'mdi-close'" />
            </v-btn>
          </v-flex>
        </v-layout>

        <slot />
      </v-card-text>

      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn
          text
          :disabled="loading"
          @click="onCancel"
          v-text="cancelLabel"
        />
        <v-btn color="accent" text :loading="loading" @click="onDone">
          {{ doneLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class DialogButton extends Vue {
  @Prop({ type: String, required: true })
  icon: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, default: 'Cancel' })
  cancelLabel: string;

  @Prop({ type: String, default: 'Done' })
  doneLabel: string;

  @Prop({ type: Boolean, default: false })
  loading: boolean;

  get isXsOnly(): boolean {
    return this.$vuetify.breakpoint.xsOnly;
  }

  onCancel() {
    this.$emit('input', false);
  }

  onDone() {
    this.$emit('done');
  }
}
</script>

<style lang="sass">
.modal
  width: 340px
  +screen(xs-only)
    width: 100%
</style>

<style lang="sass" scoped>
.modal-title
  +screen(xs-only)
    padding-left: 16px
</style>
