import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminFormEmitter = new EventEmitter<[string, boolean, any?]>();

  callListFormEmitter = new EventEmitter<string>();

  constructor() { }
}
