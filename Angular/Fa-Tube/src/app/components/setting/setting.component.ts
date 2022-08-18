import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TubeDataApiV3Service } from './../../services/tube-data-api-v3.service';
import { API_KEY, DEBOUNCE_TIME, NUMBER_PER_PAGE } from 'src/app/store';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  display = false;
  displayPosition!: boolean;
  position!: string;

  settingForm!: FormGroup;

  constructor(private fb: FormBuilder, private tubeDataApiV3Service: TubeDataApiV3Service) { }

  ngOnInit(): void {
    this.settingForm = this.fb.group({
      apiKey: [API_KEY, [Validators.required, Validators.minLength(39), Validators.maxLength(39)]],
      dbTime: [DEBOUNCE_TIME, [Validators.required, Validators.pattern('^[0-9]{2,5}$')]],
      numberPerPage: [NUMBER_PER_PAGE, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
    });

  }

  showPositionDialog(position: string): void {
    this.position = position;
    this.displayPosition = true;
  }

  defaultOne(flag: string): void {
    switch (flag) {
      case 'apiKey':
        console.log(this.tubeDataApiV3Service.getApiKey(), 'trước khi đổi default');
        this.tubeDataApiV3Service.setApiKey(API_KEY);
        console.log(this.tubeDataApiV3Service.getApiKey(), 'sau khi đổi default');
        this.settingForm.controls.apiKey.setValue('');
        alert('Update successlly');
        break;
      case 'debounceTime':
        this.tubeDataApiV3Service.setDebounceTime(DEBOUNCE_TIME);
        alert('Update successlly');

        break;
      case 'numberPerPage':
        this.tubeDataApiV3Service.setNumberPerPage(NUMBER_PER_PAGE);
        alert('Update successlly');

        break;
    }
  }

  applyOne(flag: string): void {
    console.log(this.settingForm);
    switch (flag) {
      case 'apiKey':
        if (!(this.settingForm.controls.apiKey.status === 'INVALID')) {
          console.log(this.tubeDataApiV3Service.getApiKey(), 'trước khi đổi');
          this.tubeDataApiV3Service.setApiKey(this.settingForm.controls.apiKey.value);
          console.log(this.tubeDataApiV3Service.getApiKey(), 'sau khi đổi');
          alert('Update successlly');
        } else {
          alert('Api key Invalid');
        }
        break;
      case 'debounceTime':
        if (!(this.settingForm.controls.dbTime.status === 'INVALID')) {
          this.tubeDataApiV3Service.setDebounceTime(Number(this.settingForm.controls.dbTime.value));
          alert('Update successlly');
        } else {
          alert('Debounce Time Invalid');
        }

        break;
      case 'numberPerPage':
        if (!(this.settingForm.controls.numberPerPage.status === 'INVALID')) {
          this.tubeDataApiV3Service.setNumberPerPage(Number(this.settingForm.controls.numberPerPage.value));
          alert('Update successlly');
        } else {
          alert('number per Page Invalid');
        }

        break;
    }

  }

  applyAll(): void {
    if (this.settingForm.dirty && this.settingForm.valid) {
      this.tubeDataApiV3Service.applyAllValue(
        this.settingForm.get('apiKey')?.value,
        this.settingForm.get('dbTime')?.value,
        this.settingForm.get('numberPerPage')?.value
      );
      alert('Update successlly');
      this.displayPosition = false;
    } else {
      alert('Some data field invalid, check again!');
      this.displayPosition = true;
    }

  }

  defaultAll(): void {
    this.tubeDataApiV3Service.defaultAll(API_KEY, DEBOUNCE_TIME, NUMBER_PER_PAGE);
    alert('Update successlly');
    this.displayPosition = false;
  }
}
