import Lrud from "../src/Lrud";

test("should register a new node", () => {
  const n = new Lrud();

  n.register("foo");

  expect(n.nodes.foo).toEqual({
    children: [],
    id: "foo",
  });
});

test("should not allow special props `id` and `children` to be overridden by user props", () => {
  const n = new Lrud();

  n.register("foo", { id: "bar", children: [ "baz" ] });

  expect(n.nodes.foo).toEqual({
    children: [],
    id: "foo",
  });
});

test("should add a child to its parent", () => {
  const n = new Lrud();

  n.register("foo");
  n.register("bar", { parent: "foo" });

  expect(n.nodes.foo.children).toEqual([ "bar" ]);
});

test("should add parent to the child", () => {
  const n = new Lrud();

  n.register("foo");
  n.register("bar", { parent: "foo" });

  expect(n.nodes.bar.parent).toEqual("foo");
});

test("should maintain the child order when a node is re-registered", () => {
  const n = new Lrud();

  n.register("foo");
  n.register("bar", { parent: "foo" });
  n.register("baz", { parent: "foo" });
  n.register("bar", { parent: "foo" });

  expect(n.nodes.foo.children).toEqual([ "bar", "baz" ]);
});

test("should update a node's attributes when re-registered", () => {
  const n = new Lrud();
  const onFocus = jest.fn();

  n.register("foo");
  n.register("bar", { parent: "foo" });
  n.register("baz", { parent: "foo" });
  n.register("bar", { parent: "foo", onFocus });

  expect(n.nodes.bar.onFocus).toEqual(onFocus);
});

test("should correctly register nodes when received out of order", () => {
  const n = new Lrud();

  n.register("bar", { parent: "foo" });
  n.register("foo");

  expect(n.nodes).toEqual({
    bar: {
      children: [],
      id: "bar",
      parent: "foo",
    },
    foo: {
      children: [ "bar" ],
      id: "foo",
    },
  });
});

test("should set the `root` property when received a node with no parent", () => {
  const n = new Lrud();

  n.register("bar", { parent: "foo" });
  expect(n.root).not.toBeDefined();

  n.register("foo");
  expect(n.root).toEqual("foo");
});

test("should not mutate the user props", () => {
  const n = new Lrud();
  const props = { children: [ "bar" ] };
  const clone = { ...props };

  n.register("foo", props);

  expect(props).toEqual(clone);
});
