import { BehaviorSubject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';


const getAll = gql`
query categories{
  categories{
    categoryid,
    categoryname
  }
}`;

@Injectable({
  providedIn: 'root'
})

export class CategoryServiceService {
  categories: any[];
  constructor(private apollo: Apollo) { }

  private catSource = new BehaviorSubject<any>(null);
  currCat = this.catSource.asObservable();

  getCategories() {
    this.apollo.watchQuery<any>({
      query: getAll
    }).valueChanges.subscribe(({ data }) => {
      this.categories = data.categories;
      this.changeCat(data.categories);
    }, (error) => {
      console.log(error);
    });
  }
  changeCat(input: any[]) {
    this.catSource.next(input);
    console.log('input ', input);
  }
}
