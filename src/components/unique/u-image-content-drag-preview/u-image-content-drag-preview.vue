<template>
    <div
        :at-u-image-content-drag-preview="atAttribute"
        class="u-image-content-drag-preview"
    >
        <img
            ref="refImage"
            :src="imageSrc"
            :style="{
                top: `${imageTop}px`,
                left: `${imageLeft}px`,
                opacity: isActive ? '0.8' : '0'
            }"
            alt=""
            class="image-content-drag-preview__image"
        >
    </div>
</template>

<script lang="ts">
import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    defineComponent
} from 'vue';

import useBus from '../../../use/use-bus';
import { EVENT_BUS } from '../../../constants/event-bus-constants';

export default defineComponent({
    name: 'UImageContentDragPreview',
    props: {
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    },
    setup() {
        const { setBusListener } = useBus();
        const refImage = ref();

        const imageSrc = ref('');

        const isActive = ref(false);

        const mousePositionX = ref(0);
        const mousePositionY = ref(0);

        const imageTop = computed(() => mousePositionY.value - (refImage.value?.offsetWidth || 0) / 2);
        const imageLeft = computed(() => mousePositionX.value - (refImage.value?.offsetHeight || 0) / 2);

        // @ts-ignore
        async function handleDragover(e) {
            if (!isActive.value) return;

            mousePositionX.value = e.pageX
            mousePositionY.value = e.pageY
        }

        function handleShowPreviewImage(dataSrc: string) {
            isActive.value = true;
            imageSrc.value = dataSrc;
        }

        function handleHidePreviewImage() {
            isActive.value = false;
            imageSrc.value = '';
        }

        onMounted(() => {
            window.addEventListener('dragover', handleDragover);
        });

        onUnmounted(() => {
            window.removeEventListener('dragover', handleDragover);
        });

        setBusListener(EVENT_BUS.DRAG_START, handleShowPreviewImage)
        setBusListener(EVENT_BUS.DRAG_END, handleHidePreviewImage)

        return {
            imageTop,
            imageLeft,
            refImage,
            isActive,
            mousePositionX,
            mousePositionY,
            imageSrc
        }
    }
});
</script>

<style lang="scss" src="./u-image-content-drag-preview.scss" />
