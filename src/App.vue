<template>
    <div class="app-wrapper">
        <CLayout>
            <template #sidebar>
                <USidebar />
            </template>
            <template #content>
                <UCanvas />
            </template>
        </CLayout>
        <UImageContentDragPreview />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UCanvas from './components/unique/u-canvas/u-canvas.vue';
import CLayout from './components/common/c-layout/c-layout.vue';
import USidebar from './components/unique/u-sidebar/u-sidebar.vue';
import UImageContentDragPreview from './components/unique/u-image-content-drag-preview';

export default defineComponent({
    name: 'App',
    components: {
        CLayout,
        UCanvas,
        USidebar,
        UImageContentDragPreview
    }
});
</script>

<style lang="scss" src="./main.scss" />
