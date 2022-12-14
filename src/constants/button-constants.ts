enum E_BUTTON_THEME {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	DANGER = 'DANGER'
}

type TButtonTheme = E_BUTTON_THEME.PRIMARY | E_BUTTON_THEME.SECONDARY | E_BUTTON_THEME.DANGER

enum E_BUTTON_TYPE {
	SUBMIT = 'submit',
	BUTTON = 'button',
	RESET = 'reset'
}

type TButtonType = E_BUTTON_TYPE.SUBMIT | E_BUTTON_TYPE.BUTTON | E_BUTTON_TYPE.RESET

export {
	TButtonType,
	TButtonTheme,
	E_BUTTON_TYPE,
	E_BUTTON_THEME
}
