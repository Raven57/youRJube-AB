import { Injectable, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { BooleanValueNode } from 'graphql';
import gql from 'graphql-tag';

const get = gql`
query getVideoSetting {
  tags{
    tagname
  }
  privacies{
    privacyname
  }
  categories{
    categoryname
  }
  videotypes{
    videotype
  }
  restrictions{
    restrictioncategory
  }
}
`;

@Injectable({
  providedIn: 'root'
})

export class GetVideoSettingService implements  OnDestroy{

  loading: boolean;
  error: any;

  tags: any[];
  privacies: any[];
  categories: any[];
  videotypes: any[];
  restrictions: any[];

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
  getData() {

    this.apollo.watchQuery<any>({
      query: get
    }).valueChanges.subscribe(result => {
      this.tags = result.data && result.data.tags;
      this.privacies = result.data && result.data.privacies;
      this.categories = result.data && result.data.categories;
      this.videotypes = result.data && result.data.videotypes;
      this.restrictions = result.data && result.data.restrictions;
      this.loading = result.loading;
      this.error = result.errors;
    });

    return this.users;
  }

}
