import { SidebarComponent } from './../sidebar/sidebar.component';
import { Component, ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.scss']
})

export class PremiumPageComponent implements OnInit {

  constructor() { }
  isMonthly: boolean;
  isYearly: boolean;
  ngOnInit(
   ): void {
  }
  clickMonthly() {
    if (this.isYearly) {
      this.isYearly = false;
    }
    this.isMonthly = true;
    console.log('asd');
  }
  clickYearly() {
    if (this.isMonthly) {
      this.isMonthly = false;
    }
    this.isYearly = true;
  }
  clickRegister() {
    if (!this.isMonthly && !this.isYearly) {
      alert('Select monthly or yearly package!');
    }
    else {
      //register logic
      console.log('MASUK GAN');
    }
  }
}
