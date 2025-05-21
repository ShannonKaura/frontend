import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {

  constructor(
    private audioService: AudioService,
    private documentService: DocumentService,
    private candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    // this.getAudios();
    // this.getDocuments();
  }

  getAudios() {
    console.log('start');
    this.audioService.getAllAudios().subscribe(returned => {
      
      returned.forEach((element: any) => {
        console.log(element.candidate_id);
        this.candidateService.getCandidateById(element.candidate_id).subscribe(candidate => {

          // element.id is the audio id being updated to the candidate a audio id
          candidate.audio_id = element.id
          this.candidateService.updateCandidate(candidate).subscribe(updated => {
            console.log(updated)
          })

        })
       
      })
    })
  }

  getDocuments() {
    console.log('start');
    this.documentService.getAllDocuments().subscribe(returned => {
      returned.forEach((element: any) => {
        this.candidateService.getCandidateById(element.candidate_id).subscribe(candidate => {
          if(!candidate.documents.includes(element.id)) {
            candidate.documents.push(element.id);
            this.candidateService.updateCandidate(candidate).subscribe(updated => {
              console.log(updated)
            })
          }
        })
      })
    })
  }

}
