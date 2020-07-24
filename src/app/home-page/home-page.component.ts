import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { BooleanValueNode } from 'graphql';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const getAll = gql`
query getAll {
  users{
    ID,Name
  }
}
`;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  loading: boolean;
  error: any;
  users: any [] ;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.apollo.watchQuery<any>({
      query: getAll
    }).valueChanges.subscribe(result => {
      this.users = result.data && result.data.users;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }

}
