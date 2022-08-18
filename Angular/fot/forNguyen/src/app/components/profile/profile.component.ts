import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cms: CommonService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cms.getProfile(params.id).subscribe(next => {
        console.log(next, 'project đây');
      });
    });
  }

}
