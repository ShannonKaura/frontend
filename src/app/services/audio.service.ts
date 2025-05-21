import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidateAudio } from '../models/audio';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class AudioService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllAudios() {
        return this.http.get<CandidateAudio[]>(this.baseurl + 'audios');
    }

    getAudioById(id: string) {
        return this.http.get<CandidateAudio>(this.baseurl + 'audios' + '/' + id);
    }

    getAudioByCandidateId(id: string) {
        return this.http.get<CandidateAudio>(this.baseurl + 'audio-no-profile' + '/' + id);
    }


    addAudio(audio: CandidateAudio) {
        return this.http.post(this.baseurl + 'audios', audio, { reportProgress: true, observe: 'events' });
    }

    deleteAudio(id: string) {
        return this.http.delete(this.baseurl + 'audios' + '/' + id);
    }

    updateAudio(audio: CandidateAudio): Observable<any> {
        return this.http.put<CandidateAudio>(this.baseurl + 'audios' + '/' + audio._id, audio, { reportProgress: true, observe: 'events' });
    }

}
