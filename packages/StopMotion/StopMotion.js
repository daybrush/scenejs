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

function test(inst, target) {
	if (Array.isArray(inst)) {
		return inst.indexOf(target);
	} else if (typeof inst === "string") {
		return inst === target;
	} else {
		return inst.test(target);
	}
}
export default function StopMotion(obj, options = {}) {
	const {include, exclude} = options;

	if (obj instanceof Scene) {
		const items = obj.items;

		for (const id in items) {
			const item = items[id];

			if ((include && !test(include, id)) ||
				(exclude && test(exclude, id))) {
				continue;
			}
			stopMotion(item, 0, item.getDuration(), options.count);
		}
	} else if (obj instanceof SceneItem) {
		stopMotion(obj, 0, obj.getDuration(), options.count);
	} else {
		const scene = new Scene(obj, options);

		return StopMotion(scene, options);
	}
	return obj;
}

Scene.prototype.setStopMotion = function setStopMotion(options) {
	StopMotion(this, options);
	return this;
};

SceneItem.prototype.setStopMotion = function setStopMotion(options) {
	StopMotion(this, options);
	return this;
};
