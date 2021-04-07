import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

const SVGS = {
  times: require('!!raw-loader?!../../../assets/svg/times.svg'),
  edit: require('!!raw-loader?!../../../assets/svg/edit.svg'),
  id: require('!!raw-loader?!../../../assets/svg/id.svg'),
  nocontent: require('!!raw-loader?!../../../assets/svg/nocontent.svg'),
  phone: require('!!raw-loader?!../../../assets/svg/phone.svg'),
  trash: require('!!raw-loader?!../../../assets/svg/trash.svg')
};

@Component({
  selector: 'tw-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SvgComponent implements OnInit {

  @Input() iconName: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  svg: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(SVGS[this.iconName].default);
  }
}
