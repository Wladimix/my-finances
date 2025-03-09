import { createEvent, createStore, sample } from 'effector';
import { getInflationFx } from '../effects/calculationEffects';
import { $selectedYear } from './dateStore';

export const getInflation = createEvent();

export const $inflationData = createStore<IInflationData>({
    averageCost: {},
    inflation: {}
});

// getInflation --------------------------
sample({
    clock: getInflation,
    source: $selectedYear,
    target: getInflationFx
});

sample({
    clock: getInflationFx.doneData,
    target: $inflationData
});
// ---------------------------------------
