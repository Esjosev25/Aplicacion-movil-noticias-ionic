import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonProgressBar, IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NoticiasComponent } from '../../components/noticias/noticias.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  actualCategory = ''
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = []

  flag = false;
  constructor(private noticiasService: NoticiasService) { }

  @ViewChild(NoticiasComponent) noticias_component: NoticiasComponent;

  scrollToTop() {
    this.noticias_component.scrollToTop();
  }



  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);

  }
  categoriaChanged(event) {
    this.scrollToTop();
    this.noticias = [];
    this.flag = false;
    window.scroll(0, 0);
    this.actualCategory = event.detail.value;
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadLinesCategoria(categoria)
      .subscribe(resp => {

        if (resp.articles.length == 0) {
          event.target.complete();
          this.flag = true;
          return;
        }

        this.noticias.push(...resp.articles)
        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    setTimeout(() => {
      this.cargarNoticias(this.actualCategory, event);
    }, 1500);
  }

}

