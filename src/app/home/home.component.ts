import { Component, OnInit } from '@angular/core';
import { debounceTime, toArray } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public searchInput: FormControl = new FormControl();
  public size: number = 7;
  public package = [
    {
      packageId: '001',
      name: 'name',
      summary: 'summary',
      date: 'date',
    },
  ];

  constructor() {
    this.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe((stockCode) => this.getStockInfo(stockCode));
  }

  ngOnInit(): void {
    let myArray = [];
    myArray.push(this.package);
    console.log(myArray);
  }

  getStockInfo(stockCode: string) {
    console.log(stockCode);
  }
}
