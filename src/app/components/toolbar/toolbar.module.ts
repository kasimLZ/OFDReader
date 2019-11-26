import { NgModule } from '@angular/core';

import { PageSelecterComponent } from './toolItems/page-selecter.component';
import { SidebarToggleComponent } from './toolItems/sidebar-toggle.component';
import { DownloadComponent } from './toolItems/download.component';
import { FullScreenComponent } from './toolItems/fullscreen.component';
import { PrintComponent } from './toolItems/print.component';

const MainToolBarItems = [
    PageSelecterComponent,
    SidebarToggleComponent,
    DownloadComponent,
    FullScreenComponent,
    PrintComponent
];

import { FirstPageComponent } from './toolItems/first-page.component';
import { LastPageComponent } from './toolItems/last-page.component';
import { RotateCWComponent } from './toolItems/rotate-cw.component';
import { RotateCCWComponent } from './toolItems/rotate-ccw.component';
import { HandToolComponent } from './toolItems/handtool.component';
import { InfoComponent } from './toolItems/info.component';

const SecondToolBarItems = [
    FirstPageComponent,
    LastPageComponent,
    RotateCWComponent,
    RotateCCWComponent,
    HandToolComponent,
    InfoComponent,
];

@NgModule({
    declarations: [
        ...MainToolBarItems,
        ...SecondToolBarItems
    ],
    exports: [
        ...MainToolBarItems,
        ...SecondToolBarItems
    ]
  })
export class ToolBarModule {}
