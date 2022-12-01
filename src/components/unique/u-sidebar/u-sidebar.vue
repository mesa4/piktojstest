<template>
    <div
        :at-u-sidebar="atAttribute"
        class="u-sidebar"
    >
        <div class="sidebar__section">
            <div class="sidebar__section-title">
                Upload image
            </div>
            <div class="sidebar__section-content">
                <CFileSelectArea
                    v-model:model-value="file"
                    :is-uploading="isGetImagesLoading"
                    @uploadFile="handleUploadFile"
                />
            </div>
        </div>
        <div class="sidebar__section">
            <div class="sidebar__section-title">
                Assets
            </div>
            <div class="sidebar__section-sub-title">
                Text
            </div>
            <div class="sidebar__section-content">
                <UAddTextForm />
            </div>
            <div class="sidebar__section-sub-title">
                Images
            </div>
            <div class="sidebar__section-content">
                <USidebarImagesAssets
                    :images="images"
                    :is-loading="false"
                    class="sidebar__images"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    ref,
    defineComponent
} from 'vue';

import CInput from '../../../components/common/c-input';
import CButton from '../../../components/common/c-button';
import UAddTextForm from '../../../components/unique/u-add-text-form';
import CFileSelectArea from '../../../components/common/c-file-select-area';
import USidebarImagesAssets from '../../../components/unique/u-sidebar-images-assets';

import useApiImages from '../../../use/use-api-images';

export default defineComponent({
    name: 'USidebar',
    components: {
        CInput,
        CButton,
        UAddTextForm,
        CFileSelectArea,
        USidebarImagesAssets
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
            uploadImage,
            getImages,
            isGetImagesLoading,
            isUploadImageLoading
        } = useApiImages();

        const images = ref([]);

        const file = ref<File | null>(null);

        async function fetchImages() {
            try {
                images.value = await getImages()
            } catch (error) {
                console.log('ERROR fetchImages: ', error);
            }
        }

        async function handleUploadFile() {
            if (!file.value) return;

            try {
                await uploadImage(file.value)
                file.value = null;
                await fetchImages();
            } catch (error) {
                console.log('ERROR handleUploadFile: ', error);
            }
        }

        fetchImages()

        return {
            file,
            images,
            isGetImagesLoading,
            isUploadImageLoading,
            handleUploadFile
        }
    }
});
</script>

<style lang="scss" src="./u-sidebar.scss" />
