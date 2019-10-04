import { IState, IDerive, AsyncAction } from "overmind";

export const createModals = <
  T extends {
    [name: string]: {
      state?: IState;
      result?: unknown;
    };
  }
>(
  modals: T,
): {
  state?: {
    current: keyof T;
  } & {
    [K in keyof T]: T[K]["state"] & {
      isCurrent: IDerive<any, any, boolean>;
    };
  };
  actions?: {
    [K in keyof T]: {
      open: AsyncAction<
        T[K]["state"] extends IState ? T[K]["state"] : void,
        T[K]["result"]
      >;
      close: AsyncAction<T[K]["result"]>;
    };
  };
} => {
  function createModal(name: string, modal: any) {
    let resolver: any;

    const open: AsyncAction<any, any> = async (
      { state },
      newState = {},
    ) => {
      (state as any).modals.current = name;

      Object.assign((state as any).modals[name], newState);

      return new Promise(resolve => {
        resolver = resolve;
      });
    };

    const close: AsyncAction<T> = async ({ state }, payload) => {
      (state as any).modals.current = null;
      resolver(payload || modal.result);
    };

    return {
      state: {
        ...modal.state,
        isCurrent(_: any, root: any) {
          return root.modals.current === name;
        },
      },
      actions: {
        open,
        close,
      },
    };
  }

  return Object.keys(modals).reduce(
    (aggr: any, name: any) => {
      const modal = createModal(name, modals[name]);

      aggr.state[name] = modal.state;
      aggr.actions[name] = modal.actions;

      return aggr;
    },
    {
      state: {
        current: null,
      },
      actions: {},
    },
  ) as any;
};
