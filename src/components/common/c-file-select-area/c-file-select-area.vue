<template>
    <div
        :at-c-file-select-area="atAttribute"
        class="c-file-select-area"
    >
        <template v-if="isUploading">
            <div class="file-select-area__drop-zone-uploading">
                <div class="file-select-area__drop-zone-uploading-text">
                    Uploading ...
                </div>
            </div>
        </template>
        <template v-else-if="!isFileExist">
            <div
                :class="dropZoneDraggingClass"
                class="file-select-area__drop-zone"
                @dragenter="handleDragEnter"
                @dragleave="handleDragLeave"
            >
                <div
                    class="file-select-area__drop-zone-info"
                    @drag="handleDrag"
                >
                    <div class="file-select-area__drop-zone-title">
                        <div class="file-select-area__drop-zone-title-text">
                            Drop file or click to upload
                        </div>
                    </div>
                    <div class="file-select-area__drop-zone-extensions">
                        {{ inputAcceptTypes }}
                    </div>
                </div>
                <input
                    ref="refFileInput"
                    type="file"
                    title=""
                    :accept="inputAcceptTypes"
                    class="file-select-area__drop-zone-input"
                    @change="handleDrag"
                >
            </div>
        </template>
        <div v-else class="file-select-area__drop-zone-uploaded">
            <div class="file-select-area__drop-zone-uploaded-file-name">
                {{ fileName }}
            </div>
            <div class="file-select-area__drop-zone-uploaded-actions">
                <CButton
                    :button-theme="E_BUTTON_THEME.PRIMARY"
                    label="Upload"
                    class="file-select-area__drop-zone-uploaded-button file-select-area__drop-zone-uploaded-button--upload"
                    @click="uploadFile"
                />
                <CButton
                    :button-theme="E_BUTTON_THEME.SECONDARY"
                    label="Remove"
                    class="file-select-area__drop-zone-uploaded-button file-select-area__drop-zone-uploaded-button--remove"
                    @click="removeFile"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

import {
    ref,
    computed,
    defineComponent
} from 'vue';

import CButton from '../../../components/common/c-button';

import {
    E_BUTTON_THEME,
    E_BUTTON_TYPE
} from '../../../constants/button-constants';

export default defineComponent({
    name: 'CFileSelectArea',
    components: {
        CButton
    },
    props: {
        /**
         * Define model value
         */
        modelValue: {
            type: null,
            default: null
        },
        /**
         * Define accepted file types
         */
        acceptFileTypes: {
            type: Array as PropType<Array<'.png' | '.jpeg'>>,
            default: ['.png', '.jpeg']
        },
        /**
         * Define uploading state
         */
        isUploading: {
            type: Boolean,
            default: false
        },
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    },
    emits: [
        'uploadFile',
        'fileSelected',
        'fileClear',
        'update:modelValue'
    ],
    setup(props, { emit }) {
        const refFileInput = ref<any>(null);

        const file = computed<File | null>({
            get() {
                return props.modelValue
            },
            set(value: File | null) {
                emit('update:modelValue', value)
            }
        })

        const isDragging = ref(false);

        const isFileLoading = ref<boolean>(false);

        const inputAcceptTypes = computed(() => props.acceptFileTypes?.join(','));

        const isFileExist = computed(() => Boolean(file.value));

        const fileName = computed(() => file.value?.name || '');

        const dropZoneDraggingClass = computed(() => isDragging.value ? 'input-file__drop-zone--over' : null);

        function handleDrag(e: any) {
            const files = e.target.files || e.dataTransfer.files;

            if (!files.length) {
                isDragging.value = false;
                return;
            }

            createFile(files[0]);
        }

        function createFile(fileData: File) {
            if (!fileData.type.match('image.png|image.jpeg')) {
                isDragging.value = false;
                return;
            }
            file.value = fileData;
            isDragging.value = false;
        }

        function handleDragEnter() {
            isDragging.value = true;
        }

        function handleDragLeave() {
            isDragging.value = false;
        }

        function removeFile() {
            file.value = null;
        }

        function uploadFile() {
            emit('uploadFile');
        }

        return {
            E_BUTTON_THEME,
            E_BUTTON_TYPE,
            file,
            fileName,
            isDragging,
            inputAcceptTypes,
            isFileExist,
            refFileInput,
            isFileLoading,
            dropZoneDraggingClass,
            handleDrag,
            removeFile,
            uploadFile,
            handleDragEnter,
            handleDragLeave
        };
    }
});
</script>

<style lang="scss" src="./c-file-select-area.scss" />
