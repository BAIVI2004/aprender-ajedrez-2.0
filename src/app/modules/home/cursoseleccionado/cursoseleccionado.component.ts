import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CursosService } from '../../../services/cursos.service';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos.interface';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-cursoseleccionado',
  templateUrl: './cursoseleccionado.component.html',
  styleUrls: ['./cursoseleccionado.component.css']
})
export class CursoseleccionadoComponent implements OnInit {

  productosCollection: any;
  productos$: Observable<Cursos[]>;
  videoHTML!: SafeResourceUrl; // Declaración de la variable videoHTML
  private urlvideo: string = '';

  constructor(private route: ActivatedRoute, private sanitazer: DomSanitizer, private cursosService: CursosService, private firestore: Firestore, private auth: Auth) {
    this.productosCollection = collection(firestore, 'cursos');
    this.productos$ = collectionData(this.productosCollection) as Observable<Cursos[]>;


    

  }

  cursos: Cursos[] = [];
  productoSeleccionado: Cursos | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      const productosCollectionRef = collection(this.firestore, 'cursos');
      const q = query(productosCollectionRef, where('id', '==', productId));

      getDocs(q).then(querySnapshot => {
        const productos: Cursos[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data() as Cursos;

          const cursoenelqueestamos=doc.data() as Cursos
          this.urlvideo=cursoenelqueestamos.video
          const youtubeVideoUrl= this.urlvideo
          console.log(this.urlvideo)
          this.videoHTML = this.sanitazer.bypassSecurityTrustResourceUrl(youtubeVideoUrl);
          console.log(this.videoHTML)

          console.log(this.urlvideo)
          productos.push(data);
        });

        this.productos$ = new Observable<Cursos[]>(observer => {
          observer.next(productos);
          observer.complete();
        });

        this.productos$.subscribe(productos => {
          console.log(productos);
        });

         // Asigna el valor de videoHTML después de obtenerlo de this.cursos

      });
    });
  }
}