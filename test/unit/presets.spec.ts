import {
  zoomIn, zoomOut, fadeIn, fadeOut, wipeIn, wipeOut, blink, transition
} from "../../src/presets";
import SceneItem from "../../src/SceneItem";

describe(`test presets`, () => {
  it(`test zoomIn function`, () => {
    // Given, When
    const item = zoomIn({
      from: 0,
      to: 2,
      duration: 10,
    });
    const item2 = zoomIn({
      duration: 10,
    });

    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "transform", "scale")).to.be.equals(0);
    expect(item.get(10, "transform", "scale")).to.be.equals(2);
    expect(item2.get(0, "transform", "scale")).to.be.equals(0);
    expect(item2.get(10, "transform", "scale")).to.be.equals(1);
  });
  it(`test zoomOut function`, () => {
    // Given, When
    const item = zoomOut({
      from: 2,
      to: 0,
      duration: 10,
    });
    const item2 = zoomOut({
      duration: 10,
    });

    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "transform", "scale")).to.be.equals(2);
    expect(item.get(10, "transform", "scale")).to.be.equals(0);
    expect(item2.get(0, "transform", "scale")).to.be.equals(1);
    expect(item2.get(10, "transform", "scale")).to.be.equals(0);
  });
  it(`test fadeIn function`, () => {
    // Given, When
    const item = fadeIn({
      from: 0,
      to: 2,
      duration: 10,
    });
    const item2 = fadeIn({
      duration: 10,
    });

    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "opacity")).to.be.equals(0);
    expect(item.get(10, "opacity")).to.be.equals(2);
    expect(item2.get(0, "opacity")).to.be.equals(0);
    expect(item2.get(10, "opacity")).to.be.equals(1);
  });
  it(`test fadeOut function`, () => {
    // Given, When
    const item = fadeOut({
      from: 2,
      to: 0,
      duration: 10,
    });
    const item2 = fadeOut({
      duration: 10,
    });

    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "opacity")).to.be.equals(2);
    expect(item.get(10, "opacity")).to.be.equals(0);
    expect(item2.get(0, "opacity")).to.be.equals(1);
    expect(item2.get(10, "opacity")).to.be.equals(0);
  });
  it(`test wipeIn function`, () => {
    // Given, When
    const item = wipeIn({
      from: "-100%",
      to: "100%",
      duration: 10,
    });
    const item2 = wipeIn({
      duration: 10,
    });
    const item3 = wipeIn({
      duration: 10,
      property: ["transform", "translateX"],
    });

    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "left")).to.be.equals("-100%");
    expect(item.get(10, "left")).to.be.equals("100%");
    expect(item2.get(0, "left")).to.be.equals("-100%");
    expect(item2.get(10, "left")).to.be.equals("0%");
    expect(item3.get(0, "transform", "translateX")).to.be.equals("-100%");
    expect(item3.get(10, "transform", "translateX")).to.be.equals("0%");
  });
  it(`test wipeOut function`, () => {
    // Given, When
    const item = wipeOut({
      from: "-100%",
      to: "100%",
      duration: 10,
    });
    const item2 = wipeOut({
      duration: 10,
    });
    const item3 = wipeOut({
      duration: 10,
      property: ["transform", "translateX"],
    });

    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "left")).to.be.equals("-100%");
    expect(item.get(10, "left")).to.be.equals("100%");
    expect(item2.get(0, "left")).to.be.equals("0%");
    expect(item2.get(10, "left")).to.be.equals("100%");
    expect(item3.get(0, "transform", "translateX")).to.be.equals("0%");
    expect(item3.get(10, "transform", "translateX")).to.be.equals("100%");
  });
  it(`test blink function`, () => {
    // Given, When
    const item = blink({
      from: 0,
      to: 0.5,
      duration: 10,
    });
    const item2 = blink({
      duration: 4,
    });

    console.log(item.times);
    // Then
    expect(item.getDuration()).to.be.equals(10);
    expect(item.get(0, "opacity")).to.be.equals(0);
    expect(item.get(5, "opacity")).to.be.equals(0.5);
    expect(item.get(10, "opacity")).to.be.equals(0);
    expect(item2.get(0, "opacity")).to.be.equals(0);
    expect(item2.get(2, "opacity")).to.be.equals(1);
    expect(item2.get(4, "opacity")).to.be.equals(0);
  });
  it(`test transition function`, () => {
    const item1 = new SceneItem();
    const item2 = new SceneItem();

    item1.setDuration(10);
    transition(item1, item2, {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      duration: 4,
    });

    expect(item1.get(6, "opacity")).to.be.equal(1);
    expect(item1.get(10, "opacity")).to.be.equal(0);
    expect(item2.get(0, "opacity")).to.be.equal(0);
    expect(item2.get(4, "opacity")).to.be.equal(1);
  });
});
