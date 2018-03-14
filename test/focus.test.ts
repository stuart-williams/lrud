import Lrud from "../src/Lrud";

test("should emit the `focus` event", () => {
  const n = new Lrud();
  const onFocus = jest.fn();

  n.on("focus", onFocus);
  n.register("foo");
  n.focus("foo");

  expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
    id: "foo",
  }));
});

test("should call the `onFocus` callback", () => {
  const n = new Lrud();
  const onFocus = jest.fn();

  n.register("foo", { onFocus });
  n.focus("foo");

  expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
    id: "foo",
  }));
});

test("should focus down to the first focusable child", () => {
  const n = new Lrud();
  const onFocus = jest.fn();

  n.on("focus", onFocus);
  n.register("foo");
  n.register("bar", { parent: "foo" });
  n.focus("foo");

  expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
    id: "bar",
  }));
});

test("should update the current focus", () => {
  const n = new Lrud();

  n.register("foo");
  n.focus("foo");

  expect(n.getFocusedNode()).toEqual(expect.objectContaining({
    id: "foo",
  }));
});

test("should focus the root node if no id is provided", () => {
  const n = new Lrud();
  const onFocus = jest.fn();

  n.on("focus", onFocus);
  n.register("foo");
  n.focus();

  expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
    id: "foo",
  }));
});
