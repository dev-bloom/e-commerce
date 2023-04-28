import { BaseEntry } from "contentful";

export interface ContentFulEntry<T> extends BaseEntry {
  fields: T;
}
