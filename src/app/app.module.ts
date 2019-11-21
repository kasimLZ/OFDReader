import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { ViewerContainerComponent } from './components/viewer-container/viewer-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ViewerContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
