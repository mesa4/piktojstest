<template>
    <div
        :style="{
            top: `${top}px`,
            left: `${left}px`,
            pointerEvents: isDisablePointerEvents ? 'none' : 'initial'
        }"
        :data-id="dataId"
        :at-u-canvas-item="atAttribute"
        draggable="false"
        class="u-canvas-item"
    >
        <template v-if="dataType === E_CANVAS_ITEM_DATA_TYPE.IMAGE">
            <img
                :src="data"
                alt=""
                class="canvas-item__image"
            >
        </template>
        <template v-else-if="dataType === E_CANVAS_ITEM_DATA_TYPE.TEXT">
            <span class="canvas-item__text">
                {{ data }}
            </span>
        </template>
    </div>
</template>

<script lang="ts">
import {
    ref,
    computed,
    defineComponent
} from 'vue';

import useBus from '../../../use/use-bus';
import { EVENT_BUS } from '../../../constants/event-bus-constants';
import { E_CANVAS_ITEM_DATA_TYPE } from '../../../constants/canvas-item-constants';

import type { PropType } from 'vue';
import type {
    TCanvasItemData,
    TCanvasItemDataType
} from '../../../constants/canvas-item-constants';

export default defineComponent({
    name: 'UCanvasItem',
    props: {
        /**
         * Define item ID
         */
        dataId: {
            type: String as PropType<string>,
            required: true
        },
        /**
         * Define item type
         */
        dataType: {
            type: String as PropType<TCanvasItemDataType>,
            required: true
        },
        /**
         * Define item type
         */
        data: {
            type: String as PropType<TCanvasItemData>,
            required: true
        },
        /**
         * Define element top position
         */
        top: {
            type: Number,
            required: true
        },
        /**
         * Define element left position
         */
        left: {
            type: Number,
            required: true
        },
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

        const isDisablePointerEvents = ref<boolean>(false)

        function handleDisablePointerEvents() {
            isDisablePointerEvents.value = true;
        }

        function handleEnablePointerEvents() {
            isDisablePointerEvents.value = false;
        }

        setBusListener(EVENT_BUS.DRAG_START, handleDisablePointerEvents);
        setBusListener(EVENT_BUS.DRAG_END, handleEnablePointerEvents);

        return {
            isDisablePointerEvents,
            E_CANVAS_ITEM_DATA_TYPE
        }
    }
});
</script>

<style lang="scss" src="./u-canvas-item.scss"/>
