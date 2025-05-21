import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateGenerateCodeService {

  constructor() { }

  // set generated code to local storage
  setData(data: any) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem('CANDIDATE_CODE_KEY', jsonData)
  }

  getData() {
    const code = localStorage.getItem('CANDIDATE_CODE_KEY');
    return localStorage.getItem('CANDIDATE_CODE_KEY');
  }

  removeData(key: any) {
    localStorage.removeItem(key)
  }
}
