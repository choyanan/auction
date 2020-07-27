import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  public rating: number = 0;

  public stars: boolean[];

  @Input()
  public readonly: boolean = true;

  @Output()
  public ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.stars = [];
    for (let index = 1; index <= 5; index++) {
      this.stars.push(index > this.rating);
    }
  }

  ngOnInit(): void {}

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
