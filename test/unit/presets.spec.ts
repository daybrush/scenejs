import {
  zoomIn, zoomOut, fadeIn, fadeOut
} from "../../src/presets";

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
});
