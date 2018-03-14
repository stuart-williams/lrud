import Lrud from "../src/Lrud";

test("should emit the `blur` event", () => {
  const n = new Lrud();
  const onBlur = jest.fn();

  n.on("blur", onBlur);
  n.register("foo");
  n.blur("foo");

  expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
    id: "foo",
  }));
});

test("should call the `onBlur` callback", () => {
  const n = new Lrud();
  const onBlur = jest.fn();

  n.register("foo", { onBlur });
  n.blur("foo");

  expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
    id: "foo",
  }));
});

test("should unset the current focus if blurring the current focused node", () => {
  const n = new Lrud();
  const onBlur = jest.fn();

  n.register("foo", { onBlur });
  n.focus("foo");
  n.blur("foo");

  expect(n.getFocusedNode()).not.toBeDefined();
});
