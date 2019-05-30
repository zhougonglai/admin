import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-wrapper',
  template: `
    <div [ngStyle]="style">
      <img class="img" [src]="src" [alt]="desc" />
      <div *ngIf="desc" class="desc">{{ desc }}</div>
    </div>
  `,
  styleUrls: ['./index.styl'],
})
export class ImageWrapperComponent {
  @Input() style: { [key: string]: string };
  @Input() src: string;
  @Input() desc: string;
}
