import { Component, Input, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TubeDataApiV3Service } from './../../services/tube-data-api-v3.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  displayMaximizable!: boolean;
  displayPosition!: boolean;
  position!: string;
  video!: any;


  constructor(private route: ActivatedRoute, private tubeDataApiV3Service: TubeDataApiV3Service) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tubeDataApiV3Service.getVideo(params.id).subscribe(
        data => {
          this.video = data[0];

        },
        err => {
          console.log(err);
        });
    });
  }

  showPositionDialog(position: string): void {
    // this.position = position;
    // this.displayPosition = true;
  }


  showMaximizableDialog(): void {
    this.displayMaximizable = true;
  }

}
