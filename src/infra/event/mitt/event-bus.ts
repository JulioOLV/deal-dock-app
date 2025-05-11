import mitt, { Emitter } from 'mitt';

type Events = {
  'product-search-editted': string;
};

export const emitter: Emitter<Events> = mitt<Events>();