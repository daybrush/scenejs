import React from "react";
import ReactDOM from "react-dom";
import { SceneItem, EASE_IN_OUT } from "../../src/index";
import "./raindrop.css";

class App extends React.Component {
	renderCircle(delay) {
		return <SceneItem
			from={{ "borderWidth": "150px", opacity: 1, transform: "scale(0)" }}
			to={{ "borderWidth": "0px", opacity: 0.3, transform: "scale(0.7)" }}
			delay={delay}
			duration={1.5}
			easing={EASE_IN_OUT}
			iterationCount="infinite">
			{({ styles }) => <div className="raindrop" style={styles}></div>}
		</SceneItem>;
	}
	render() {
		return <div className="container">
			{this.renderCircle(0)}
			{this.renderCircle(0.4)}
			{this.renderCircle(0.8)}
		</div>;
	}
}


ReactDOM.render(<App />, document.getElementById("root"));
