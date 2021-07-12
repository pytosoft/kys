import { MenuItem, MessageService } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionComponent implements OnInit {

  public items: MenuItem[] = [];

  subscription: Subscription = new Subscription();

  constructor(public messageService: MessageService) {}

  ngOnInit() {
      this.items = [{
              label: 'Subscriber Type',
              routerLink: 'app/subscription/user'
          },
          {
              label: 'Personal Information',
              routerLink: 'app/subscription/personal'
          },
          {
              label: 'Choose Plan',
              routerLink: 'app/subscription/plan'
          },
          {
              label: 'Confirmation',
              routerLink: 'app/subscription/confirmation'
          }
      ];
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
