import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuarios } from '../model/UsuariosFace';

const ITEMS_KEY = 'my-items';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  // CREATE
  addItem(item: Usuarios): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Usuarios[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }
 
  // READ
  getItems(): Promise<Usuarios[]> {
    return this.storage.get(ITEMS_KEY);
  }
  // UPDATE
  updateItem(item: Usuarios): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Usuarios[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let newItems: Usuarios[] = [];
 
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
 
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }
 
  // DELETE
  deleteItem(id: number): Promise<Usuarios> {
    return this.storage.get(ITEMS_KEY).then((items: Usuarios[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: Usuarios[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
