import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/service/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {

    this.chargeNews();

  }

  loadData( event ) {

    this.chargeNews( event );

  }

  chargeNews( event? ) {

    this.noticiasService.getTopHeadLines()
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

}
