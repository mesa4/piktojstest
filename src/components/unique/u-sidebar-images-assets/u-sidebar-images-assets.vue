<template>
    <div
        :at-u-sidebar-images-assets="atAttribute"
        class="u-sidebar-images-assets"
    >
        <img
            ref="refDragstartBackgroundImage"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            alt=""
            class="sidebar-images-assets__empty-image"
        >
        <img
            v-for="imageSrc in imagesList"
            :src="imageSrc"
            :style="{ backgroundImage: `url(${imageSrc})` }"
            alt=""
            class="sidebar-images-assets__item"
            draggable="true"
            @dragstart="handleDragStart($event, imageSrc, refDragstartBackgroundImage)"
            @dragend="handleDragEnd"
        />
    </div>
</template>

<script lang="ts">
import {
    ref,
    computed,
    defineComponent,
} from 'vue';

import type { PropType } from 'vue';

import useBus from '../../../use/use-bus';
import { EVENT_BUS } from '../../../constants/event-bus-constants';

export default defineComponent({
    name: 'USidebarImagesAssets',
    props: {
        /**
         * List of user assets images
         */
        images: {
            type: Array as PropType<Array<string>>,
            default: () => []
        },
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { busEmit } = useBus();

        const imagesList = computed<Array<string>>(() => props.images)

        const refDragstartBackgroundImage = ref(null);

        // @ts-ignore
        function handleDragStart(e: DragEvent, imageSrc: string, emptyImage) {
            busEmit(EVENT_BUS.DRAG_START, imageSrc);

            // @ts-ignore
            const originalWidth = e.target.naturalWidth
            // @ts-ignore
            const originalHeight = e.target.naturalHeight

            // @ts-ignore
            e.dataTransfer.dropEffect = 'copy';
            // @ts-ignore
            e.dataTransfer.effectAllowed = 'copy';
            // @ts-ignore
            e.dataTransfer.setDragImage(emptyImage, 0, 0);

            const imageData = JSON.stringify({
                src: imageSrc,
                originalWidth,
                originalHeight
            });

            // @ts-ignore
            e.dataTransfer.setData('imageData', imageData);
        }

        function handleDragEnd() {
            busEmit(EVENT_BUS.DRAG_END);
        }

        return {
            refDragstartBackgroundImage,
            imagesList,
            handleDragStart,
            handleDragEnd
        }
    }
});
</script>

<style lang="scss" src="./u-sidebar-images-assets.scss" />
