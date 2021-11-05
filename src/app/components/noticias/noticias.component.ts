import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() noticias: Article[] = []
  @Input() tabFav: boolean = false;
  @ViewChild('RecordList', { static: false }) list: IonContent;

  constructor() { }

  ngOnInit() {

  }

  scrollToTop() {
    this.list.scrollToTop();
  }
}
