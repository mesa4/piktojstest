<template>
    <div
        :at-u-canvas="atAttribute"
        class="u-canvas"
    >
        <div
            class="canvas__frame"
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            @mouseup="handleMouseUp"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
        >
            <UCanvasItem
                v-for="item in canvasItemsList"
                :key="item.id"
                :data-id="item.id"
                :is-active="item.isActive"
                :data-type="item.dataType"
                :data="item.data"
                :top="item.position.y"
                :left="item.position.x"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {
    ref,
    defineComponent
} from 'vue';

import UCanvasItem from '../../../components/unique/u-canvas-item';

import useBus from '../../../use/use-bus';
import useCanvasItemHelper from './use/use-canvas-item-helper';
import { EVENT_BUS } from '../../../constants/event-bus-constants';
import { E_CANVAS_ITEM_DATA_TYPE } from '../../../constants/canvas-item-constants';

import type { ICreateCanvasItemParams } from '../../../constants/canvas-item-constants';

export default defineComponent({
    name: 'UCanvas',
    components: {
        UCanvasItem
    },
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
        const {
            busEmit,
            setBusListener
        } = useBus();
        const {
            canvasItemsList,
            addCanvasItem,
            getCanvasItem,
            setCanvasItemActivesState,
            resetCanvasItemsListActiveState
        } = useCanvasItemHelper();

        const activeCanvasItem = ref(null);
        const isMoving = ref(false);
        const itemX = ref(0);
        const itemY = ref(0);
        const prevX = ref(0);
        const prevY = ref(0);

        // @ts-ignore
        function handleMouseDown(e) {
            if (!e.target.classList.contains('u-canvas-item')) return

            const id = e.target.dataset.id
            isMoving.value = true
            // @ts-ignore
            activeCanvasItem.value = getCanvasItem(id);
            setCanvasItemActivesState(id);
            // @ts-ignore
            const { x = 0, y = 0 } = activeCanvasItem.value?.position;
            itemX.value = x;
            itemY.value = y;
            prevX.value = e.pageX;
            prevY.value = e.pageY;
        }

        // @ts-ignore
        function handleMouseUp(e) {
            if (!e.target.classList.contains('u-canvas-item')) return

            isMoving.value = false;
            activeCanvasItem.value = null;
            itemX.value = 0;
            itemY.value = 0;
            prevX.value = 0;
            prevY.value = 0;

            resetCanvasItemsListActiveState();
        }

        // @ts-ignore
        function handleMouseMove(e) {
            if (isMoving.value && activeCanvasItem.value) {
                // @ts-ignore
                activeCanvasItem.value.position.x = itemX.value - (prevX.value - e.pageX);
                // @ts-ignore
                activeCanvasItem.value.position.y = itemY.value - (prevY.value - e.pageY);
            }
        }

        function handleDrop(e: DragEvent) {
            // @ts-ignore
            e.dataTransfer.dropEffect = 'copy';
            // @ts-ignore
            e.dataTransfer.effectAllowed = 'copy';
            // @ts-ignore
            const imageData = e.dataTransfer.getData('imageData');

            if (!imageData) return;

            const parsedData = JSON.parse(imageData);

            const { src, originalWidth, originalHeight } = parsedData;

            const preparedData: ICreateCanvasItemParams = {
                data: src,
                dataType: E_CANVAS_ITEM_DATA_TYPE.IMAGE,
                position: {
                    x: e.offsetX - (originalWidth / 2),
                    y: e.offsetY - (originalHeight / 2)
                }
            }

            busEmit(EVENT_BUS.CREATE_CANVAS_ITEM, preparedData);
        }

        function handleCreateCanvasItem(params: ICreateCanvasItemParams) {
            const { data, dataType, position = { x: 0, y: 0 } } = params
            addCanvasItem(dataType, data, position);
        }

        setBusListener(EVENT_BUS.CREATE_CANVAS_ITEM, handleCreateCanvasItem)

        return {
            canvasItemsList,
            handleDrop,
            handleMouseDown,
            handleMouseUp,
            handleMouseMove
        }
    }
});
</script>

<style lang="scss" src="./u-canvas.scss" />
