import { Injectable } from '@angular/core';
import { DocumentService } from './document.service';
import { TextObject, CharPosition } from 'type/ofd';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly DocSrv: DocumentService) {}

  private status = false;
  public get Status(): boolean { return this.status; }

  private current: number;
  public get Current(): number { return this.current; }

  private highlight = false;
  public get Highlight(): boolean { return this.highlight; }
  public set Highlight(value: boolean) { this.highlight = value; }


  private ignoreCase = false;
  public get IgnoreCase(): boolean { return this.ignoreCase; }
  public set IgnoreCase(value: boolean) { this.ignoreCase = value; }

  private MatchResult: { [key: number]: PageCharPosition[] };

  public toggle(): void {
    this.status = !this.status;
  }

  public SearchText(text: string): number {
    const Doc = this.DocSrv.PresentDocument;
    const MatchStr = text;
    const SlidingLen = text.length;
    const SlidingStr: PageCharPosition[] = [];
    const CharBuffer: PageCharPosition[] = [];

    let PageIndex = 0;
    let PageObject = Doc.Pages.Get(PageIndex);
    let ItemIndex = 0;

    this.MatchResult = {};
    let MatchLength = 0;
    this.current = 1;

    function MoveNext(num: number = 1): boolean {
      let count = 0;
      while (count < num) {

        if (CharBuffer.length < 1) {
          let item = PageObject.GetItemByIndex(ItemIndex++);
          while (!item) {
            if (ItemIndex >= PageObject.Length) {
              PageObject = Doc.Pages.Get(++PageIndex);
              if (!PageObject) { return false; }
              ItemIndex = 0;
            }
            item = PageObject.GetItemByIndex(ItemIndex++);
          }

          if (item instanceof TextObject) {
            for (const char of item.CharSet) {
              const pchar = char as PageCharPosition;
              pchar.PageIndex = PageIndex;
              CharBuffer.push(pchar);
            }
          } else {
            continue;
          }
        }

        while (CharBuffer.length > 0 && count < num) {
          SlidingStr.push(CharBuffer.shift());
          while (SlidingStr.length > SlidingLen) {
            SlidingStr.shift();
          }
          count++;
        }
      }
      return true;
    }

    MoveNext(SlidingLen);

    let status = true;
    while (status) {
      let flag = true;
      for (let i = 0; i < SlidingLen; i++) {
        if (SlidingStr[i].chr !== MatchStr[i]) {
          flag = false; break;
        }
      }

      if (flag) { this.MatchResult[++MatchLength] = [...SlidingStr]; }

      status = MoveNext();

      if (status) {
        const sliding = MatchStr.lastIndexOf(SlidingStr[SlidingLen - 1].chr);
        status = MoveNext(sliding > -1 ? SlidingLen - sliding - 1 : SlidingLen);
      }
    }
    return MatchLength;
  }
}

interface PageCharPosition extends CharPosition {
  PageIndex: number;
}
