import {
    writable
} from 'svelte/store';

export const token         = writable("")
export const cid           = writable("")
export const phone         = writable("")
export const settings      = writable({})
export const points        = writable({})
export const businessIndex = writable("")
export const location      = writable("")