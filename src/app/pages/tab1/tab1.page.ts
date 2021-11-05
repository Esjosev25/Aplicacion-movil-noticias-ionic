import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../../interfaces/interfaces';
import { empty } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasSerice: NoticiasService) {
  }

  ngOnInit() {
    this.cargarNoticias();
  }
  loadData(event) {

    setTimeout(() => {
      this.cargarNoticias(event);
    }, 1500);

  }

  cargarNoticias(event?) {
    this.noticiasSerice.getTopHeadLines().subscribe(
      (resp) => {

        if (resp.articles.length == 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.noticias.push(...resp.articles);

        console.log(resp)
        if (event) {
          event.target.complete();
        }
      }
    );
  }
}
