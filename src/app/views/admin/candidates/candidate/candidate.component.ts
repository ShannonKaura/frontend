import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  public profileCandidate = "profile candidate";
  public acceptedCandidate = "accepted candidate";
  public intrainingCandidate = "candidate in training";
  public currentTabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getSelectedIndex(): number {
    return this.currentTabIndex;
  }

  onTabChange(event: any) {
    this.currentTabIndex = event.index;
  }


}
