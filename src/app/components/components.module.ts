import { NgModule } from '@angular/core';
import { PageComponent } from './page/page.component';

@NgModule({
    declarations: [
      PageComponent
    ],
    exports: [PageComponent]
  })
  export class ComponentsModule { }
