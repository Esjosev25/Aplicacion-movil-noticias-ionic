import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage, private toastController: ToastController) {
    this.init();
    this.cargarFavoritos();
  }


  guardarNoticia(noticia: Article) {


    const existe = this.noticias.find(noti => noti.title === noticia.title)

    if (!existe) {
      this.noticias.unshift(noticia)
      this.storage.set('favoritos', this.noticias)
      this.presentToast('Noticia agregada a favoritos');
    }

  }
  borrarNoticia(noticia: Article) {


    this.noticias = this.noticias.filter(noti => noti.title != noticia.title)
    this.storage.set('favoritos', this.noticias)
    this.presentToast('Noticia eliminada de favoritos');
  }
  //}
  async init() {
    await this.storage.create();
  }
  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos')

    if (favoritos != null)
      this.noticias = favoritos
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000
    });
    toast.present();
  }
}
