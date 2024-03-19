export class HideAfterContext {
  hideAfter: number;
  counter: number;

  get $implicit() {
    return this.hideAfter;
  }

}
