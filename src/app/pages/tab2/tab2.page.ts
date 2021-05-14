import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/service/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
// export class Tab2Page implements OnInit, AfterViewInit {
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {

    this.segment.value = this.categorias[0];

    this.loadNews( this.categorias[0] );

  }

  // ngAfterViewInit() {
  //   this.segment.value = this.categorias[0];
  // }

  changeCategory( event ) {

    console.log( event.detail.value );

    this.noticias = [];

    this.loadNews( event.detail.value );

  }

  loadNews( category: string, event? ) {

    this.noticiasService.getTopHeadLinesCategory( category )
        .subscribe( resp => {
            console.log(resp);

            if( resp.articles.length === 0){
              event.target.disabled = true;
              event.target.complete();
            }

            this.noticias.push( ...resp.articles );

            if( event ){
              event.target.complete();
            }
        } );

  }

  loadData( event ) {

    this.loadNews( this.segment.value, event );
  }


}
