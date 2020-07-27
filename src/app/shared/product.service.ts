import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public searchEvent: EventEmitter<ProductHttpParams> = new EventEmitter();

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>('/api/product/' + id);
  }

  public getCommentsByProductId(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('/api/product/' + productId + '/comments');
  }

  public search(p: ProductHttpParams): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products', {
      params: this.enCodeParams(p),
    });
  }

  private enCodeParams(params: ProductHttpParams) {
    return Object.keys(params) //将传入的对象都取出变成一个集合
      .filter((key) => params[key]) //留下有值的
      .reduce((sum: HttpParams, key: string) => {
        //汇总，最终的字符串sum，循环属性的名字为key
        sum.append(key, params[key]); //将所有有值的属性都挂接到sum上，变成最终的字符串
        return sum;
      }, new HttpParams());
  }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {}
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {}
}

export class ProductHttpParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
}
