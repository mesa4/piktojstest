enum E_CANVAS_ITEM_DATA_TYPE {
	IMAGE = 'IMAGE',
	TEXT = 'TEXT'
}

type TCanvasItemDataType = E_CANVAS_ITEM_DATA_TYPE.IMAGE | E_CANVAS_ITEM_DATA_TYPE.TEXT

type TCanvasItemData = string

interface ICanvasItemPosition {
	x: number
	y: number
}

interface ICanvasItem {
	id: string
	dataType: TCanvasItemDataType
	data: string
	position: ICanvasItemPosition,
	isActive: boolean
}

interface ICreateCanvasItemParams {
	dataType: TCanvasItemDataType
	data: string
	position?: ICanvasItemPosition
}

export {
	ICanvasItem,
	TCanvasItemData,
	TCanvasItemDataType,
	ICanvasItemPosition,
	ICreateCanvasItemParams,
	E_CANVAS_ITEM_DATA_TYPE
}
