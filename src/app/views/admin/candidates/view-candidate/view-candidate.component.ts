import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Candidate, Education, Experience } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.scss']
})
export class ViewCandidateComponent implements OnInit {

  public candidate!: Candidate;
  public maxDate: Date = new Date();
  public hide = true;

  public document_base64: any;
  public document_name: any;
  public documetSelectedFileBLOB: any;

  public audio_base64: any;
  public audio_name: any;
  public audioSelectedFileBLOB: any;

  public candidate_basic_details: boolean = false;
  public candidate_professional_summary: boolean = false;
  public candidate_education: boolean = false;
  public candidate_skills: boolean = false;
  public candidate_resume: boolean = false;
  public profile_completion = 0;

  public audios: any;
  public documents: any;
  public candidate_audio: any;
  public candidate_document: any;

  public empty_audio: boolean = true;
  public empty_document: boolean = true;
  public document_link: string = '';

  // audio player variables
  public audiopDisplayTitle = false;
  public audiopDisplayPlayList = true;
  public audiopPageSizeOptions = [2, 4, 6];
  public audiopDisplayVolumeControls = true;
  public audiopDisplayRepeatControls = true;
  public audiopDisplayArtist = false;
  public audiopDisplayDuration = false;
  public audiopDisablePositionSlider = true;
  public currentTrack = null;

  public experience: Experience = {
    title: '',
    employment_type: '',
    company: '',
    location: {
      country: '',
      city: '',
    },
    currently_working: '',
    start_date: '',
    end_date: '',
    description: '',
    media: '',
  }

  public education: Education = {
    academic_level: '',
    school: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    grade: '',
    activities: '',
    description: '',
    media: '',
  }

  public audio_link: string = '';

  public audiopPlaylist: Track[] = [
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },
  ];

  constructor(
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<ViewCandidateComponent>,
    private audioService: AudioService,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.initCandidate();
    this.getCandidate();
    this.getCandidateAudio();
    this.getCandidateDocument();
  }

  initCandidate() {
    this.candidate = {
      _id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      headline: '',
      profile_image: '',
      available: false,
      job_title: '',
      experience: [],
      tools: [],
      projects: [],
      education: [],
      featured: [],
      date_of_birth: '',
      summary: '',
      skills: [],
      country: '',
      country_code: '',
      city: '',
      industry_category: '',
      email: '',
      phone: '',
      access_level: '',
      password: '',
      account_type: 'candidate',
      interview: [],
      original_candidate_record: {},
      modified_candidate_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      profile_completion: 0,
      audio_id: '',
      documents: [],
      dob: new Date(Date.now()).getTime() / 1000,
      candidate_type: '',
      technical_skills: [],
      staff: false,
      employment_status: '',
      job_role: {
        job_name: '',
        id: ''
      },
    }
  }

  // get candidate by Id
  getCandidate() {
    const candidateId = this.candidatedatainfo.id
    if (candidateId) {
      this.candidateService.getCandidateById(candidateId).subscribe(returnedcandidate => {
        this.candidate = returnedcandidate;

        console.log(this.candidate)
      })
    }
  }

  // get candidate audio
  getCandidateAudio() {
    const candidateId = this.candidatedatainfo.id;

    if (candidateId) {
      this.audioService.getAllAudios().subscribe((audios: any) => {
        this.audios = audios;

        if (this.audios.length > 0) {
          this.candidate_audio = this.audios.filter((audio: any) =>
            audio.candidate_id === candidateId)

          if (this.candidate_audio.length > 0) {
            this.empty_audio = false;

            this.audio_base64 = this.candidate_audio[0]?.audio;
            this.audio_name = this.candidate_audio[0]?.document_name;

            // coverting base64 string to file
            this.audioDataURLtoFile(this.audio_base64, this.audio_name);
          } else {
            this.empty_audio = true;
          }

        } else {
          this.empty_audio = true;
        }
      })
    }
  }


  // get candidate document
  getCandidateDocument() {
    const candidateId = this.candidatedatainfo.id;

    if (candidateId) {
      this.documentService.getAllDocuments().subscribe((documents: any) => {
        this.documents = documents;

        if (this.documents.length > 0) {
          this.candidate_document = this.documents.filter((document: any) =>
            document.candidate_id === candidateId);

          // replace https with http
          // this.document_link = this.document_link.replace("https", "http");
          if (this.candidate_document.length > 0) {
            this.empty_document = false;
            this.candidate_resume = true;

            this.document_base64 = this.candidate_document[0]?.document;
            this.document_name = this.candidate_document[0]?.document_name;

            // coverting base64 string to file
            this.documentDataURLtoFile(this.document_base64, this.document_name);
          } else {
            this.empty_document = true;
          }
        }
      })
    }
  }

  documentDataURLtoFile(dataurl: any, filename: any) {
    const url = dataurl;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], filename, { type: mime });

        let url = window.URL.createObjectURL(file);

        this.documetSelectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);
      })
  }

  audioDataURLtoFile(dataurl: any, filename: any) {
    const url = dataurl;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], filename, { type: mime });

        let url = window.URL.createObjectURL(file);

        this.audioSelectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);

        this.audiopPlaylist = [
          {
            title: 'Candidate Audio',
            link: this.audioSelectedFileBLOB,
            artist: '',
            duration: 10000
          },
        ];

      })
  }

  // download document
  DownloadDocument() {
    const url = `${this.document_link}`;

    window.open(url, "_blank");
  }


  onEnded(event: any) {
    // console.log(event);
    this.currentTrack = null;
  }

  close() {
    this.dialogRef.close();
  }
}
