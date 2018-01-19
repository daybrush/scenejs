import Scene, {SceneItem} from "scenejs";

const interval = 0.00001;

function stopMotion(item, start = 0, end, count) {
	if (!count || count < 1) {
		return;
	}
	const depth = (end - start) / count;

	for (let i = 1; i <= count - 1; ++i) {
		item.setFrame(start + i * depth, item.getNowFrame(start + i * depth));
	}
	for (let i = 1; i <= count; ++i) {
		item.setFrame(start + i * depth - interval, item.getFrame(start + (i - 1) * depth));
	}
}

export default function StopMotion(obj, options = {}) {
	if (obj instanceof Scene) {
		const items = obj.items;

		for (const id in items) {
			const item = items[id];

			stopMotion(item, 0, item.duration, options.count);
		}
	} else if (obj instanceof SceneItem) {
		stopMotion(obj, 0, obj.duration, options.count);
	} else {
		const scene = new Scene(obj, options);

		return StopMotion(scene, options);
	}
	return obj;
}


export const StopMotionItem = function StopMotionItem(obj, options = {}) {
	const item = new SceneItem(obj, options);

	stopMotion(item, 0, item.duration, options.count);

	return item;
};

StopMotion.Scene = Scene;
