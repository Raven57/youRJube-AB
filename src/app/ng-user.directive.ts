import { ComponentFactoryResolver, Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNgUser]'
})
export class NgUserDirective {

  constructor(
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }

}
