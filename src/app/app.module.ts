import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MulitplePipe } from './pipe/mulitple.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { ChildComponent } from './child/child.component';
import { LogTestComponent } from './log-test/log-test.component';
import { LogService } from './shared/log.service';
import { LogPublishersService } from './shared/log-publisher.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    SearchComponent,
    ProductsComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    MulitplePipe,
    FilterPipe,
    ChildComponent,
    LogTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LogService, LogPublishersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
