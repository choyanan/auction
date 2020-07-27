import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public productId: number;
  public product: Product;
  public comments: Comment[];
  public newRating: number = 5;
  public newComment: string = '';
  public isCommentHidden: boolean = true;
  public divClass: any = {
    a: false,
    b: false,
    c: false,
  };

  public devClass: any = {
    background: 'yellow',
    color: 'red',
  };

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService
  ) {
    setTimeout(() => {
      this.devClass = {
        background: 'red',
        color: 'yellow',
      };
    }, 3000);
  }

  ngOnInit(): void {
    this.productId = this.routeInfo.snapshot.params['id'];
    this.productService
      .getProductById(this.productId)
      .subscribe((product) => (this.product = product));
    this.productService
      .getCommentsByProductId(this.productId)
      .subscribe((comments) => (this.comments = comments));
  }

  addComment() {
    let comment = new Comment(
      0,
      this.product.id,
      new Date().toISOString(),
      'someone',
      this.newRating,
      this.newComment
    );

    this.comments.unshift(comment);
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }
}
