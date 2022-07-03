import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[app-dropDown]'
})
export class DropDownDirective {
  private openClass = 'show';
  private isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elmRef.nativeElement.contains(event.target) ? !this.isOpen : false;

    const dropMenuElmRef = this.renderer.nextSibling(this.elmRef.nativeElement);

    if (this.isOpen) {
      this.renderer.addClass(dropMenuElmRef, this.openClass);
    }
    else {
      this.renderer.removeClass(dropMenuElmRef, this.openClass);
    }
  }

  constructor(private renderer: Renderer2, private elmRef: ElementRef) {
  }
}
