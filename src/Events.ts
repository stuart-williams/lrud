type Listener = (...args: any[]) => void;

class Events {
  private events: { [eventName: string]: Listener[]; } = {};

  public on(eventName: string, listener: Listener): Events {
    this.events[eventName] = [ ...(this.events[eventName] || []), listener ];
    return this;
  }

  public off(eventName: string, listener: Listener): Events {
   this.events[eventName] = (this.events[eventName] || []).filter((l) => l !== listener);
   return this;
  }

  public emit(eventName: string, ...args: any[]): boolean {
    const listeners = this.events[eventName] || [];

    listeners.forEach((listener) => listener(...args));

    return !!listeners.length;
  }
}

export default Events;
