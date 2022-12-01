import { ref } from 'vue';

import type {
	ICanvasItem,
	ICanvasItemPosition,
	TCanvasItemData,
	TCanvasItemDataType
} from '../../../../constants/canvas-item-constants';

function useCanvasItemHelper() {
	const canvasItemsList = ref<Array<ICanvasItem>>([]);

	function addCanvasItem(
		dataType: TCanvasItemDataType,
		data: TCanvasItemData,
		position: ICanvasItemPosition
	) {
		const canvasItem: ICanvasItem = {
			id: `${dataType}_${Date.now()}`,
			dataType,
			data,
			position,
			isActive: false
		}

		canvasItemsList.value = [...canvasItemsList.value, canvasItem]
	}

	function resetCanvasItemsListActiveState() {
		canvasItemsList.value = canvasItemsList.value.map(item => {
			return {
				...item,
				isActive: false
			}
		});
	}

	function setCanvasItemActivesState(itemId: string) {
		const currentItem = canvasItemsList.value.find(item => item.id === itemId)
		if (!currentItem) return

		currentItem.isActive = true;
	}

	function getCanvasItem(id: string) {
		return canvasItemsList.value.find(item => item.id === id);
	}

	return {
		canvasItemsList,
		addCanvasItem,
		resetCanvasItemsListActiveState,
		setCanvasItemActivesState,
		getCanvasItem
	}
}

export default useCanvasItemHelper
