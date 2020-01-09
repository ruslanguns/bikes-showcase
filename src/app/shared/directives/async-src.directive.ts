import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appAsyncSrc]'
})
export class AsyncSrcDirective {
  private _imageUrl: string;

  @Input('appAsyncSrc') set image(val: string) {
    console.log('aaaa');
    if (val !== this._imageUrl) {
      this._imageUrl = val;
      setTimeout(() => {
        this.setSrc(this._imageUrl);
      }, 3000);
    }
  }

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
  ) { }

  private setSrc(src: string) {
    const currentVal = this._element.nativeElement.getAttribute('src');
    if (currentVal !== src) {
      if (src) {
        this._renderer.setAttribute(this._element.nativeElement, 'src', src);
      } else {
        this._renderer.removeAttribute(this._element.nativeElement, 'src');
      }
    }
  }

}
