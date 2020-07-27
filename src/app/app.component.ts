import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('child1')
  child1: ChildComponent;
  title = 'auction3';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.child1.greeting();
  }
}
