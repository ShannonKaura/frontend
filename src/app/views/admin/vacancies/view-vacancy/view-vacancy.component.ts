import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vacancy } from 'src/app/models/vacancy';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-view-vacancy',
  templateUrl: './view-vacancy.component.html',
  styleUrls: ['./view-vacancy.component.scss']
})
export class ViewVacancyComponent implements OnInit {

  public vacancy!: Vacancy;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private vacancyService: VacancyService,
    @Inject(MAT_DIALOG_DATA) public vacancydatainfo: any,
    private dialogRef: MatDialogRef<ViewVacancyComponent>,
  ) { }

  ngOnInit(): void {
    this.initVacancy();
    this.getVacancy();
  }

  // initialize vacancy model
  initVacancy() {
    this.vacancy = {
      _id: '',
      name: '',
      category: '',
      created_by: '',
      created_date: {},
      modified_date: {},
      expiry_date: {},
      salary_range: {
        from: 0,
        to: 0
      },
      summary: '',
      responsibilities: '',
      skills: '',
      qualifications: '',
      vacancy_type: '',
      city: '',
      country: '',
      apply_process: '',
      interested_candidates: [],
      intraining_candidates: [],
      shortlisted_candidates: [],
      rejected_candidates: [],
      under_review_candidates: [],
      accepted_candidates_after_interview: [],
      rejected_candidates_after_interview: [],
      under_review_candidates_after_interview: [],
    }
  }

  // get vacancy by Id
  getVacancy() {
    const vacancyId = this.vacancydatainfo.id
    if (vacancyId) {
      this.vacancyService.getVacancyById(vacancyId).subscribe(returnedvacancy => {
        this.vacancy = returnedvacancy;
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
