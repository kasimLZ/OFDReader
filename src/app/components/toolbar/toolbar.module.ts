import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { PageSelecterComponent } from './toolItems/page-selecter.component';
import { SidebarToggleComponent } from './toolItems/sidebar-toggle.component';
import { DownloadComponent } from './toolItems/download.component';
import { FullScreenComponent } from './toolItems/fullscreen.component';
import { PrintComponent } from './toolItems/print.component';
import { ZoomComponent } from './toolItems/zoom.component';
import { SearchComponent } from './toolItems/search.component';

const MainToolBarItems = [
    PageSelecterComponent,
    SidebarToggleComponent,
    DownloadComponent,
    FullScreenComponent,
    PrintComponent,
    ZoomComponent,
    SearchComponent
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

import { SearchBarComponent } from './toolItems/searchBar.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    declarations: [
        ...MainToolBarItems,
        ...SecondToolBarItems,
        SearchBarComponent
    ],
    exports: [
        ...MainToolBarItems,
        ...SecondToolBarItems,
        SearchBarComponent
    ]
  })
export class ToolBarModule {}
