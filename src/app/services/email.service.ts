import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({}),
  };
  public email_baseurl!: string;
  public email_api_key!: string;
  public sendinblue_api = 'https://api.sendinblue.com/v3/smtp/email';
  public sendinble_key = '';

  constructor(
    private http: HttpClient,
  ) { }

  // Job Offer Dynamic Email
  JobOfferEmail(email_text: any, candidate_email: any) {

    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: candidate_email,
          name: "Admin",
        },
      ],

      subject: "Youpro Contact Job Offer",
      templateId: 13,

      params: {
        PARAGRAPH1: email_text.paragraph1,
        PARAGRAPH2: email_text.paragraph2,
        PARAGRAPH3: email_text.paragraph3,
        PARAGRAPH4: email_text.paragraph4,
        PARAGRAPH5: email_text.paragraph5,
        PARAGRAPH6: email_text.paragraph6,
        PARAGRAPH7: email_text.paragraph7,
        PARAGRAPH8: email_text.paragraph8,
        PARAGRAPH9: email_text.paragraph9,
        PARAGRAPH10: email_text.paragraph10,
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };


    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  SendTestEmail44(email_text: any) {
    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: 'tapschikuniben@gmail.com',
          name: "Admin",
        },
      ],

      subject: "Youpro Contact Reset Password",
      templateId: 13,

      params: {
        PARAGRAPH1: email_text
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    // data.textContent = `${delivery_message}`;
    this.http
      .post(this.email_baseurl, JSON.stringify(data), httpOptions)
      .subscribe((x: any) => {
        console.log(x.messageId);
      });
  }

  // reset password email
  SendResetPasswordEmail(resetPasswordAdminCode: any, adminEmail: any) {
    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: adminEmail,
          name: "Admin",
        },
      ],

      subject: "Youpro Contact Reset Password",
      templateId: 2,

      params: {
        CODE: resetPasswordAdminCode
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    // data.textContent = `${delivery_message}`;
    this.http
      .post(this.email_baseurl, JSON.stringify(data), httpOptions)
      .subscribe((x: any) => {
        console.log(x.messageId);
      });
  }

  // send email after providing email only on signup
  // send candidate email
  SendCandidateWelcomeEmail(email: any) {
    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: email,
        },
      ],

      subject: "Welcome To Youpro Careers",
      templateId: 4,

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };


    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  // send candidate email
  SendIntestedCandidateEmail(firstname: any, middlename: any, lastname: any, email: any, vacancy_position: any) {
    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: email,
          name: firstname,
        },
      ],

      subject: "APPLICATION RECEIVED",
      templateId: 5,

      params: {
        FIRSTNAME: firstname,
        MIDDLENAME: middlename,
        LASTNAME: lastname,
        VACANCYPOSITION: vacancy_position,
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  // send emails to rejected candidates
  RejectedApplicationEmail(firstname: any, middlename: any, lastname: any, email: any, vacancy_position: any) {
    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      to: [
        {
          email: email,
          name: firstname,
        },
      ],

      subject: "Candidate",
      templateId: 8,

      params: {
        FIRSTNAME: firstname,
        MIDDLENAME: middlename,
        LASTNAME: lastname,
        VACANCYPOSITION: vacancy_position,
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  // send emails to shortlisted candidates
  ShortlistedCandidateEmail(email: any, firstname: any, middlename: any, lastname: any, vacancy_position: any, time: any, date: any) {

    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: email,
          name: firstname,
        },
      ],

      subject: "INTERVIEW INVITATION",
      templateId: 6,

      params: {
        FIRSTNAME: firstname,
        MIDDLENAME: middlename,
        LASTNAME: lastname,
        INTERVIEWTIME: time,
        INTERVIEWDATE: date,
        VACANCYPOSITION: vacancy_position
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  // send emails communicating to candidate after interview
  CommunicationAfterInterviewEmail(firstname: any, middlename: any, lastname: any, email: any) {
    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      to: [
        {
          email: email,
          name: firstname,
        },
      ],

      subject: "Communication After Interview",
      templateId: 9,

      params: {
        FIRSTNAME: firstname,
        MIDDLENAME: middlename,
        LASTNAME: lastname
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  // send emails to rejected candidates
  RejectedCandidateEmail(email: any) {

    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: email
        },
      ],

      subject: "INTERVIEW",
      templateId: 7,

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  JobOfferCallAgentEmail(email: any, firstname: any, middlename: any, lastname: any, vacancy_position: any, time: any, date: any) {

    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: email,
          name: firstname,
        },
      ],

      subject: "JOB OFFER",
      templateId: 11,

      params: {
        FIRSTNAME: firstname,
        MIDDLENAME: middlename,
        LASTNAME: lastname,
        STARTTIME: time,
        STARTDATE: date,
        VACANCYPOSITION: vacancy_position,
      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }

  JobOfferAdminEmail(email: any, firstname: any, middlename: any, lastname: any, vacancy_position: any, time: any, date: any, salary: any) {

    let data = {
      sender: {
        name: "Youpro Contact",
        email: "tech@youprocontact.co.uk",
      },

      // to: this.sendTo,

      to: [
        {
          email: email,
          name: firstname,
        },
      ],

      subject: "JOB OFFER",
      templateId: 12,

      params: {
        FIRSTNAME: firstname,
        MIDDLENAME: middlename,
        LASTNAME: lastname,
        STARTTIME: time,
        STARTDATE: date,
        VACANCYPOSITION: vacancy_position,
        SALARY: salary

      },

    };

    // Base url
    this.email_baseurl = this.sendinblue_api;

    this.email_api_key = this.sendinble_key;

    // Http Headers
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "api-key": this.email_api_key,
      }),
    };

    const promise: any = new Promise((resolve, reject) => {
      // data.textContent = `${delivery_message}`;
      return this.http.post(this.email_baseurl, JSON.stringify(data), httpOptions)
        .toPromise().then((x: any) => {
          resolve(x.messageId);
        }, msg => {
          reject(msg);
        });
    });
    return promise;
  }


}

