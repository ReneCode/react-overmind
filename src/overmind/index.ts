import { IConfig } from "overmind";
import { namespaced } from "overmind/config";
import { createHook } from "overmind-react";

import * as project from "./project";
import { createModals } from "./createModals";
import * as modalsConfig from "./modals/config";

export const config = namespaced({
  project,
  modals: createModals(modalsConfig)
});

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
