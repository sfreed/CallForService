import { Injectable, EventEmitter } from '@angular/core';
import { Officer } from '../models/sources/Officer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminFormEmitter = new EventEmitter<[string, boolean, any]>();

  constructor() { }
}
