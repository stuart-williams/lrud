import Lrud from "../src/Lrud";

test("should emit the `blur` event", () => {
  const n = new Lrud();
  const onBlur = jest.fn();

  n.on("blur", onBlur);
  n.register("foo");
  n.blur("foo");

  expect(onBlur).toHaveBeenCalled();
});
