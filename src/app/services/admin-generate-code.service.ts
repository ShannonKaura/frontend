import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGenerateCodeService {

  constructor() { }

  // set generated code to local storage
  setData(data: any) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem('CODE_KEY', jsonData)
  }

  getData() {
    const code = localStorage.getItem('CODE_KEY');
    return localStorage.getItem('CODE_KEY');
  }

  removeData(key: any) {
    localStorage.removeItem(key)
  }
}
