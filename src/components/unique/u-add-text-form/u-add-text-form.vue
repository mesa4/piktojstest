<template>
    <form
        :at-u-add-text-form="atAttribute"
        class="u-add-text-form"
        @submit.prevent="handleSubmitForm"
    >
        <CInput
            v-model:model-value="text"
            class="add-text-form__input"
        />
        <CButton
            :button-type="E_BUTTON_TYPE.SUBMIT"
            class="add-text-form__button"
            label="Add text"
        />
    </form>
</template>

<script lang="ts">
import {
    ref,
    defineComponent
} from 'vue';

import CInput from '../../../components/common/c-input';
import CButton from '../../../components/common/c-button';

import useBus from '../../../use/use-bus';
import { EVENT_BUS } from '../../../constants/event-bus-constants';
import { E_BUTTON_TYPE } from '../../../constants/button-constants';
import { E_CANVAS_ITEM_DATA_TYPE } from '../../../constants/canvas-item-constants';

import type { ICreateCanvasItemParams } from '../../../constants/canvas-item-constants';

export default defineComponent({
    name: 'UAddTextForm',
    components: {
        CInput,
        CButton
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
        const { busEmit } = useBus();

        const text = ref<string>('');

        function handleSubmitForm() {
            if (text.value) {
                const preparedData: ICreateCanvasItemParams = {
                    data: text.value.trim(),
                    dataType: E_CANVAS_ITEM_DATA_TYPE.TEXT,
                    position: {
                        x: 0,
                        y: 0
                    }
                };

                busEmit(EVENT_BUS.CREATE_CANVAS_ITEM, preparedData)
            }
        }

        return {
            text,
            E_BUTTON_TYPE,
            handleSubmitForm
        }
    }
});
</script>

<style lang="scss" src="./u-add-text-form.scss" />
