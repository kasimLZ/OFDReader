import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-hand-tool',
  template: `
    <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="启用手形工具" tabindex="60" data-l10n-id="hand_tool_enable">
      <span data-l10n-id="hand_tool_enable_label">启用手形工具</span>
    </button>
  `
})
export class HandToolComponent {
  constructor() {}

  @HostListener('click')
  _click() {
      console.log('swith hand tool');
  }
}
