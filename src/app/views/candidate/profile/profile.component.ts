import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Candidate } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { StatusService } from 'src/app/services/status.service';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { AddEducationComponent } from '../add-education/add-education.component';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddMediaComponent } from '../add-media/add-media.component';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { AddStatusComponent } from '../add-status/add-status.component';
import { EditDocumentComponent } from '../edit-document/edit-document.component';
import { EditMediaComponent } from '../edit-media/edit-media.component';
import { EditStatusComponent } from '../edit-status/edit-status.component';
import { UpdateAvailabilityComponent } from '../update-availability/update-availability.component';
import { UpdateCandidateBioComponent } from '../update-candidate-bio/update-candidate-bio.component';
import { UpdateCandidateContactComponent } from '../update-candidate-contact/update-candidate-contact.component';
import { UpdateCandidateProfessionalSummaryComponent } from '../update-candidate-professional-summary/update-candidate-professional-summary.component';
import { UpdateCandidateSkillComponent } from '../update-candidate-skill/update-candidate-skill.component';
import { UpdateEducationComponent } from '../update-education/update-education.component';
import { UpdateExperienceComponent } from '../update-experience/update-experience.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { Vacancy } from 'src/app/models/vacancy';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public applicationInfoSubscription!: Subscription;
  public applicationInfo: any;
  public selectedVacancyDetails: any;
  public application_in_progress = false;
  public applied = false;
  public complete_info_warning = false;

  public candidate!: any;
  public audios: any;
  public documents: any = [];
  public empty_audio: boolean = true;
  public empty_document: boolean = true;
  public document_link: string = '';
  public candidate_audio: any;
  public candidate_document: any;

  public statuses: any;
  public empty_status: boolean = true;
  public status_link: string = '';
  public audio_link: string = '';

  public candidate_status: any;

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

  public interviews: any = [];

  public imageError: any;
  public isImageSaved: boolean = false;
  public cardImageBase64: any;

  public ImageBaseData: any;

  public audiopPlaylist: Track[] = [
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },
  ];
  public document_base64: any;
  public document_name: any;
  public documetSelectedFileBLOB: any;

  public audio_base64: any;
  public audio_name: any;
  public audioSelectedFileBLOB: any;

  public basic_details: boolean = false;
  public contact_details: boolean = false;
  public professinal_summary: boolean = false;
  public education: boolean = false;
  public skills: boolean = false;
  public age!: number;
  public isLoggedIn = false;
  public user: any;
  public audio = false;




  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private audioService: AudioService,
    private documentService: DocumentService,
    private statusService: StatusService,
    private sanitizer: DomSanitizer,
    private sharedData: SharingDataService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private vacancyService: VacancyService,
    private notifier: NotifierService,
    private emailService: EmailService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    this.getCandidateById();
    this.getCandidateStatus();

    this.applicationInfoSubscription = this.sharedData.currentApplicationInfo.subscribe((data: any) => this.applicationInfo = data);

    if (Object.keys(this.applicationInfo).length === 0) {
      this.application_in_progress = false;
      console.log('application vacancy', this.applicationInfo)
    } else {
      this.application_in_progress = true;
    }
  }


  ngOnDestroy() {
    this.applicationInfoSubscription.unsubscribe();
  }
  getCandidateById() {
    const candidateId = this.route.snapshot.paramMap.get('id');
    this.candidateService.getCandidateById(candidateId).subscribe(returned => {

      // checking registration completion rate
      // check basic details

      if (returned.first_name && returned.last_name && returned.country && returned.city && returned.dob) {
        this.basic_details = true;
      } else {
        this.basic_details = false;
      }

      // check candidate summary
      if (returned.summary) {
        this.professinal_summary = true;
      } else {
        this.professinal_summary = false;
      }

      // check candidate education details
      if (returned.education.length > 0) {
        this.education = true;
      } else {
        this.education = false;
      }

      // check candidate skills
      if (returned.skills.length > 0) {
        this.skills = true;
      } else {
        this.skills = false;
      }

      // check contact details
      if (returned.phone && returned.email) {
        this.contact_details = true;
      } else {
        this.contact_details = false;
      }

      this.candidate = returned;

      // get candidate age
      var today = new Date();
      var birthDate = new Date(this.candidate.dob);
      var age = (today.getFullYear() - birthDate.getFullYear());
      var m = (today.getMonth() - birthDate.getMonth());
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;

      // get candidate audio
      if (this.candidate.audio_id) {
        this.empty_audio = false;

        this.audioService.getAudioById(this.candidate.audio_id).subscribe(returned_audio => {
          this.audio_base64 = returned_audio.audio;
          this.audio_name = returned_audio.audio_name;

          // coverting base64 string to file
          this.audioDataURLtoFile(this.audio_base64, this.audio_name);
        })
      } else {
        this.empty_audio = true;
      }

      // get candidate document
      if (this.candidate.documents.length > 0) {
        this.empty_document = false;

        this.candidate.documents.forEach((element: any) => {
          this.documentService.getDocumentById(element).subscribe(returned_doc => {
            this.document_base64 = returned_doc.document;
            this.document_name = returned_doc.document_name;

            // coverting base64 string to file
            this.documentDataURLtoFile(this.document_base64, this.document_name);
          })
        });

      } else {
        this.empty_document = true;
      }
    })
  }


  //update candidate bio
  openEditCandidateBio(selected: any): void {
    const dialogRef = this.dialog.open(UpdateCandidateBioComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();
    })
  }

  //update professional summary
  openEditProfessionalSummary(selected: any) {
    const dialogRef = this.dialog.open(UpdateCandidateProfessionalSummaryComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update professional summary
  openEditAvailability(selected: any) {
    const dialogRef = this.dialog.open(UpdateAvailabilityComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update professional summary
  openAddExperience(selected: any) {
    const dialogRef = this.dialog.open(AddExperienceComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update contact information
  openUpdateContactInfo(selected: any) {
    const dialogRef = this.dialog.open(UpdateCandidateContactComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update professional summary
  openAddEducation(selected: any) {
    const dialogRef = this.dialog.open(AddEducationComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update professional summary
  openAddSkill(selected: any) {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update experience
  openEditExperience(selected: any, index: any) {
    const dialogRef = this.dialog.open(UpdateExperienceComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: { candidate: selected, selected_index: index },
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update professional summary
  openEditEducation(selected: any, index: any) {
    const dialogRef = this.dialog.open(UpdateEducationComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: { candidate: selected, selected_index: index },
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  //update professional summary
  openEditSkill(selected: any, index: any) {
    const dialogRef = this.dialog.open(UpdateCandidateSkillComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: { candidate: selected, selected_index: index },
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(returned => {
      this.getCandidateById();

    })
  }

  PlayAudio() {
    const url = `${this.audio_link}`;

    window.open(url, "_blank");
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



  onEnded(event: any) {
    this.currentTrack = null;
  }

  //add skill to candidate
  openMedia(selected: any) {
    const dialogRef = this.dialog.open(AddMediaComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCandidateById();

    });
  }

  openEditMedia(selected: any) {
    const dialogRef = this.dialog.open(EditMediaComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCandidateById();

    });
  }

  //add document to candidate
  openDocument(selected: any) {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCandidateById();

    });
  }

  openEditDocument(selected: any) {
    const dialogRef = this.dialog.open(EditDocumentComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCandidateById();

    });
  }


  // get candidate document
  getCandidateStatus() {
    const candidateId = this.route.snapshot.paramMap.get('id');

    if (candidateId) {
      this.statusService.getAllStatuses().subscribe((statuses: any) => {
        this.statuses = statuses.statuses;

        if (this.statuses.length > 0) {
          this.candidate_status = this.statuses.filter((status: any) =>
            status.candidate_id === candidateId);

          this.status_link = this.candidate_status[0]?.status;

          if (this.candidate_status.length > 0) {
            this.empty_status = false;
          } else {
            this.empty_status = true;
          }
        }
      })
    }
  }

  openStatus(selected: any) {
    const dialogRef = this.dialog.open(AddStatusComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCandidateStatus();
      this.getCandidateById();

    });
  }

  openEditStatus(selected: any) {
    const dialogRef = this.dialog.open(EditStatusComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCandidateStatus();
      this.getCandidateById();

    });
  }

  // upload file as base 64
  handleFileInput(files: any) {

    const max_size = 7 //MB
    const me = this;
    const file = files.target.files[0];
    const reader = new FileReader();

    // file size in MB
    const file_size = file.size / (1024 * 1024)

    if (file_size < max_size) {
      reader.readAsDataURL(file);

      reader.onload = function () {
        console.log(reader.result);
        me.ImageBaseData = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    } else {
      console.log("max size is", max_size, "MB")
    }

  }

  // check if profile is complete
  CheckProfileIfComplete(candidate: Candidate) {
    if (candidate.first_name && candidate.last_name && candidate.city && candidate.phone && candidate.country && candidate.dob && candidate.summary && candidate.education.length && candidate.skills.length && candidate.documents.length) {
      return true;
    }
    return false
  }


  SendApplication() {
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

    this.candidateService.getCandidateById(this.user.id).subscribe(candidate => {
      if (this.applicationInfo.category == 'Sales') {
        if (candidate.audio_id && this.CheckProfileIfComplete(candidate)) {
          this.audio = true;
          this.ApplicationProcess(candidate);
        } else {
          this.complete_info_warning = true;
        }
      } else {
        if (this.CheckProfileIfComplete(candidate)) {
          this.ApplicationProcess(candidate);
        } else {
          this.complete_info_warning = true;
        }
      }
    })
  }

  ApplicationProcess(current_candidate: any) {
    const application_date = new Date(Date.now()).getTime() / 1000;

    this.candidateService.getCandidateById(this.user.id).subscribe((candidate: any) => {
      this.applicationInfo.interested_candidates.push({ _id: this.user.id, application_date: application_date, first_name: candidate.first_name, middle_name: candidate.middle_name, last_name: candidate.last_name });

      this.vacancyService.updateVacancy(this.applicationInfo).subscribe(returned => {

        // update candidate interview information

        const interview_info = {
          vacancy_id: this.applicationInfo.id,
          vacancy_name: this.applicationInfo.name,
          vacancy_created_date: new Date(Date.now()).getTime() / 1000,
          interview_notes: '',
          interview_score: ''
        }

        candidate.interview.push(interview_info);

        // update candidate
        this.candidateService.updateCandidate(candidate).subscribe(updated => {

          this.notifier.Notification("success", "Application successful");
          this.applied = true;

          const url = `/jobs/${this.applicationInfo.id}`;
          this.router.navigate([url]);

          this.emailService.SendIntestedCandidateEmail(current_candidate.firstname, current_candidate.middlename, current_candidate.lastname, current_candidate.email, this.applicationInfo.name).then((result: any) => {
            this.notifier.Notification("success", "Email has been sent to you , check your inbox");
          });
        })
      })
    });

  }



}
