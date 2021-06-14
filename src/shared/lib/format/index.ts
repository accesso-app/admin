import { Store, combine } from 'effector';

export function format<T extends Array<Store<any>>>(
  strings: TemplateStringsArray,
  ...stores: T
): Store<string> {
  return combine(stores, (stores) =>
    strings.reduce(
      (acc, value, index) =>
        acc.concat(isLastElement(strings, index) ? value : `${value}${stores[index]}`),
      '',
    ),
  );
}

function isLastElement<T extends ReadonlyArray<unknown>>(array: T, index: number): boolean {
  return index + 1 === array.length;
}
