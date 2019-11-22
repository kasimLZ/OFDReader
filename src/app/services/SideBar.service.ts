import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private open = false;

  public currentIndex = 0;

  public readonly pictures: { scale: number, base64: string }[] = [];

  public get Open(): boolean { return this.open; }

  public toggle(): void { this.open = !this.open; }

  public Set(index: number, scale: number, base64: string): void {
    console.log(index);
    this.pictures[index] = { scale, base64 };
  }

  public Clear(): void {
    this.pictures.length = 0;
  }
}
