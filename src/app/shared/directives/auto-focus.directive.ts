import { Directive, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  @Input() appAutofocus: boolean;
  private el: any;
  constructor(
    private elementRef: ElementRef,
  ) {
    this.el = this.elementRef.nativeElement;

  }
  ngAfterViewInit() {
    setTimeout(() => {

      this.el.focus();

    }, 500);
  }

}
