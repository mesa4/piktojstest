<template>
    <input
        v-model="localValue"
        :at-c-input="atAttribute"
        class="c-input"
    />
</template>

<script lang="ts">
import {
    computed,
    defineComponent
} from 'vue';

export default defineComponent({
    name: 'CInput',
    props: {
        /**
         * model value
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const localValue = computed<string>({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            }
        });

        return {
            localValue
        }
    }
});
</script>

<style lang="scss" src="./c-input.scss" />
