// Importaciones necesarias desde Angular core y Firebase
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CursosService } from '../../../services/cursos.service';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos.interface';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

// Decorador Component que define las propiedades del componente
@Component({
  selector: 'app-cursoseleccionado', // Selector que se utiliza para referenciar el componente en las plantillas
  templateUrl: './cursoseleccionado.component.html', // Ruta del archivo HTML asociado al componente
  styleUrls: ['./cursoseleccionado.component.css'] // Ruta del archivo de estilos asociado al componente
})
export class CursoseleccionadoComponent implements OnInit {

  productosCollection: any;
  productos$: Observable<Cursos[]>;
  videoHTML!: SafeResourceUrl; // Declaración de la variable videoHTML
  private urlvideo: string = '';

  // Constructor del componente que recibe servicios y dependencias
  constructor(private route: ActivatedRoute, private sanitazer: DomSanitizer, private cursosService: CursosService, private firestore: Firestore, private auth: Auth) {
    this.productosCollection = collection(firestore, 'cursos');
    this.productos$ = collectionData(this.productosCollection) as Observable<Cursos[]>;
  }

  cursos: Cursos[] = [];
  productoSeleccionado: Cursos | undefined;

  // Método ngOnInit que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Suscripción a los cambios de los parámetros de la ruta
    this.route.params.subscribe(params => {
      const productId = params['id'];

      // Creación de una consulta para obtener el curso con el ID proporcionado
      const productosCollectionRef = collection(this.firestore, 'cursos');
      const q = query(productosCollectionRef, where('id', '==', productId));

      // Ejecución de la consulta y procesamiento del resultado
      getDocs(q).then(querySnapshot => {
        const productos: Cursos[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data() as Cursos;

          // Obtención de la URL del video y generación de la URL segura utilizando DomSanitizer
          const cursoenelqueestamos = doc.data() as Cursos;
          this.urlvideo = cursoenelqueestamos.video;
          const youtubeVideoUrl = this.urlvideo;
          this.videoHTML = this.sanitazer.bypassSecurityTrustResourceUrl(youtubeVideoUrl);

          // Agregado del curso a la lista de productos
          productos.push(data);
        });

        // Creación de un observable para almacenar y observar la lista de productos
        this.productos$ = new Observable<Cursos[]>(observer => {
          observer.next(productos);
          observer.complete();
        });

        // Suscripción a los cambios en la lista de productos para realizar acciones adicionales si es necesario
        this.productos$.subscribe(productos => {
          console.log(productos);
        });

        // Asigna el valor de videoHTML después de obtenerlo de this.cursos
      });
    });
  }
}
