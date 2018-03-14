import Events from "./Events";

export interface INode {
  id?: string;
  parent?: string;
  children?: string[];
  onFocus?: (event: INode) => void;
  onBlur?: (event: INode) => void;
  onSelect?: (event: INode) => void;
  onMove?: (event: INode) => void;
  activeChild?: string;
}

class Lrud extends Events {
  public nodes: { [id: string]: INode; } = {};
  public root: string;
  public currentFocus: string;

  public register(id: string, props?: INode): void {
    const node = this.createNode(id, props);

    if (node.parent) {
      const pnode = this.createNode(node.parent);

      this.addChild(pnode, id);
      this.nodes[node.parent] = pnode;
    } else {
      this.root = id;
    }

    this.nodes[id] = node;
  }

  public unregister(id: string): void {
    const node = this.nodes[id];

    if (!node) {
      return;
    }

    const pnode = this.nodes[node.parent];

    if (pnode) {
      this.removeChild(pnode, id);
    }

    if (this.currentFocus === id) {
      this.blur(id);
    }

    node.children.forEach(this.unregister.bind(this));
    delete this.nodes[id];
  }

  public blur(id: string): void {
    const node = this.nodes[id];

    if (!node) {
      return;
    }

    const event = { ...node };

    if (node.onBlur) {
      node.onBlur(event);
    }

    this.emit("blur", event);

    if (this.currentFocus === id) {
      this.currentFocus = undefined;
    }
  }

  public focus(id?: string): void {
    const node = this.nodes[id] || this.nodes[this.root];

    if (!node) {
      return;
    }

    const child = this.getActiveChild(node);

    if (child) {
      this.focus(child.id);
    }

    this.currentFocus = id;

    const event = { ...node };

    if (node.onFocus) {
      node.onFocus(event);
    }

    this.emit("focus", event);

    // TODO: Bubble active
  }

  public getFocusedNode(): INode {
    const node = this.nodes[this.currentFocus];

    if (node) {
      return { ...node };
    }
  }

  public getActiveChild(node: INode): INode {
    const id = node.activeChild || node.children[0];
    const child = this.nodes[id];

    if (child) {
      return { ...child };
    }
  }

  private addChild(node: INode, id: string): void {
    if (node.children.indexOf(id) === -1) {
      node.children.push(id);
    }
  }

  private removeChild(node: INode, id: string): void {
    node.children = node.children.filter((child) => child !== id);

    if (node.activeChild === id) {
      node.activeChild = undefined;
    }
  }

  private createNode(id: string, props: INode = {}): INode {
    const node = this.nodes[id] || {};
    const clone = { ...props };

    delete clone.id;
    delete clone.children;

    return { id, children: [], ...node, ...clone };
  }
}

export default Lrud;
