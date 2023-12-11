import { Injectable } from '@angular/core';
import {
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { getDocs } from '@firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cursos } from '../interfaces/cursos.interface';
import {  Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private productosSource = new BehaviorSubject<any | null>(null);
  productos$ = this.productosSource.asObservable();

  constructor(private firestore: Firestore) {}

  anadircurso(cursos: Cursos) {
    const productosRef = collection(this.firestore, 'cursos');
    return addDoc(productosRef, cursos);
  }

  obtenercurso(filter = '') {
    const productosRef = collection(this.firestore, 'cursos');
    let q = query(productosRef);
    if (filter) {
      q = query(productosRef, where('nombre', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Cursos[]>;
  }
  
  
  async actualizarcurso(cursos: Cursos) {
    const productosRef = collection(this.firestore, 'cursos');
    const q = query(productosRef, where('id', '==', cursos.id));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.docs.length > 0) {
      const document = querySnapshot.docs[0];
      const docRef = doc(this.firestore, 'cursos', document.id);
      await updateDoc(docRef, { ...cursos });
    }
  }
  

  async deletePlayer(id: string) {
    const productosRef = collection(this.firestore, 'cursos');
    let q = query(productosRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'cursos', document.id);
      deleteDoc(docRef);
    });
  }

  deletecurso(cursos: Cursos) {
    const productosDocRef = doc(this.firestore, `cursos/${cursos.id}`);
    return deleteDoc(productosDocRef);
  }

  async updateProductId(productId: string, newId: string): Promise<void> {
    const productoRef = doc(this.firestore, 'cursos', productId);
    await updateDoc(productoRef, { id: newId });
  }
  
  
}
