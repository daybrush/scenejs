import Scene, {SceneItem} from "scenejs";

function stopMotion(item, start = 0, end, level) {
	const depth = (end - start) / level;

	for (let i = 1; i <= level - 1; ++i) {
		item.setFrame(start + i * depth, item.getNowFrame(start + i * depth));
	}
	for (let i = 1; i <= level; ++i) {
		item.setFrame(start + i * depth - 0.01, item.getFrame(start + (i - 1) * depth));
	}
}

export default function StopMotion(obj, options = {}) {
	if (obj instanceof Scene) {
		const items = obj.items;

		for (const id in items) {
			const item = items[id];

			stopMotion(item, 0, item.duration, options.level);
		}
	} else if (obj instanceof SceneItem) {
		stopMotion(obj, 0, obj.duration, options.level);
	} else {
		const scene = new Scene(obj, options);

		return StopMotion(scene, options);
	}
	return obj;
}


export const StopMotionItem = function StopMotionItem(obj, options = {}) {
	const item = new SceneItem(obj, options);

	stopMotion(item, 0, item.duration, options.level);

	return item;
};

StopMotion.Scene = Scene;
