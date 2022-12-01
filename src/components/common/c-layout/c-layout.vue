<template>
    <div
        :at-c-layout="atAttribute"
        class="c-layout"
    >
        <div class="layout__sidebar">
            <slot name="sidebar" />
        </div>
        <div class="layout__content">
            <slot name="content" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CLayout',
    props: {
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    }
});
</script>

<style lang="scss" src="./c-layout.scss" />
