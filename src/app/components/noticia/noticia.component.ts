import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article
  @Input() id: number
  @Input() tabFav;
  iconFav: string = 'heart-outline'
  iconText: string = 'Favorito'
  constructor(public actionSheetController: ActionSheetController, private iab: InAppBrowser,
    private socialSharing: SocialSharing, private datalocalService: DataLocalService) { }

  ngOnInit() {

    if (this.tabFav) {
      this.iconFav = 'trash-outline'
      this.iconText = 'Eliminar Favorito'
    }
  }
  async showMenu() {
    const actionSheet = await this.actionSheetController.create({

      buttons: [{
        text: 'Compartir',
        icon: 'share-outline',
        //cssClass: 'text-primary',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url

          )
        }

      }, {
        text: this.iconText,
        icon: this.iconFav,

        handler: () => {
          console.log(this.noticia);
          if (this.tabFav) {
            this.datalocalService.borrarNoticia(this.noticia);

          } else {
            this.datalocalService.guardarNoticia(this.noticia);

          }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        // cssClass: 'text-primary',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system')
  }


}
