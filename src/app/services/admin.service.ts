import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminFormEmitter = new EventEmitter<[string, boolean]>();

  constructor() { }
}
