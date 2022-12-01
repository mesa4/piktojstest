<template>
    <button
        :type="buttonType"
        :disabled="isDisabled"
        :class="themeClass"
        :at-c-button="atAttribute"
        class="c-button"
    >
        {{ label }}
    </button>
</template>

<script lang="ts">
import {
    computed,
    defineComponent, PropType
} from 'vue';

import {
    E_BUTTON_TYPE,
    E_BUTTON_THEME
} from '../../../constants/button-constants';

import type {
    TButtonType,
    TButtonTheme
} from '../../../constants/button-constants';

export default defineComponent({
    name: 'CButton',
    props: {
        /**
         * Button inner text
         */
        label: {
            type: String as PropType<string>,
            default: ''
        },
        /**
         * Button disabled state
         */
        isDisabled: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        /**
         * Button type
         */
        buttonType: {
            type: String as PropType<TButtonType>,
            validator: (val: TButtonType) => Object.values(E_BUTTON_TYPE).includes(val),
            default: E_BUTTON_TYPE.BUTTON
        },
        /**
         * Button type
         */
        buttonTheme: {
            type: String as PropType<TButtonTheme>,
            validator: (val: TButtonTheme) => Object.values(E_BUTTON_THEME).includes(val),
            default: E_BUTTON_THEME.PRIMARY
        },
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String as PropType<string>,
            default: ''
        }
    },
    setup(props, { emit }) {
        const buttonThemeMap = {
            [E_BUTTON_THEME.PRIMARY]: 'button--primary',
            [E_BUTTON_THEME.SECONDARY]: 'button--secondary',
            [E_BUTTON_THEME.DANGER]: 'button--danger'
        }

        const themeClass = computed(() => buttonThemeMap[props.buttonTheme]);

        return {
            themeClass
        }
    }
});
</script>

<style lang="scss" src="./c-button.scss" />
