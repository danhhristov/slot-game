import { PixiComponent } from "@pixi/react"
import { Spine } from "pixi-spine"

export const SpineAnimation = PixiComponent("SpineAnimation", {
	create: ({ spineData, animationName, loop = false }) => {
		const spine = new Spine(spineData)
		if (animationName && spine.state.hasAnimation(animationName)) {
			spine.state.setAnimation(0, animationName, true)
		}
		return spine
	},
	applyProps: (instance, oldProps, newProps) => {
		const { spineData, animationName, loop, ...pixiProps } = newProps
		Object.assign(instance, pixiProps) // x, y, alpha, etc.

		if (animationName && animationName !== oldProps.animationName) {
			instance.state.setAnimation(0, animationName, true)
		}
	},
	config: { destroy: true, destroyChildren: true },
})
