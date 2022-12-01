import { ref } from 'vue';

import { api } from '../services/api-service';

function useApiImages() {
	const isGetImagesLoading = ref<boolean>(false);

	async function getImages() {
		isGetImagesLoading.value = true;
		try {
			const response = await api.get('/images');
			return Promise.resolve(response)
		} catch (error) {
			return Promise.reject(error);
		} finally {
			isGetImagesLoading.value = false;
		}
	}

	const isUploadImageLoading = ref<boolean>(false);

	async function uploadImage(file: File) {
		isUploadImageLoading.value = true;
		try {
			const formData = new FormData();
			formData.append('file', file);
			const response = await api.post(
				'/uploads',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);
			return Promise.resolve(response)
		} catch (error) {
			return Promise.reject(error);
		} finally {
			isUploadImageLoading.value = false;
		}
	}

	return {
		isGetImagesLoading,
		isUploadImageLoading,
		getImages,
		uploadImage
	}
}

export default useApiImages;
