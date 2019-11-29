import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { ViewerContainerComponent } from './components/viewer-container/viewer-container.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { ToolBarModule } from './components/toolbar/toolbar.module';
import { InfoModalComponent } from './components/info-modal/info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ViewerContainerComponent,
    SidebarComponent,
    ToolbarComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToolBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
