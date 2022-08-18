import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthService } from 'src/app/services/auth.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { of, Subscription, throwError } from 'rxjs';

import { ProfileService } from 'src/app/services/profile.service';
import { LoginComponent } from './login.component';
class RouterMock {
  navigate(commands: any, extra?: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let profileService: ProfileService;
  let fb: FormBuilder;
  let mss: MessageService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MessagesModule,
        MessageModule,
      ],
      providers: [
        MessageService,
        PrimeNGConfig,
        FormBuilder,
        ProfileService,
        {
          provide: Router,
          useClass: RouterMock
        },
        AuthService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    //Khởi tạo component
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    //Inject service
    fb = TestBed.inject(FormBuilder);
    profileService = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
    mss = TestBed.inject(MessageService);
    //ANCHOR mục đích để lấy instance của service
  });
  //ANCHOR xong bước config component
  //Test case
  it('ngOnInit: should create', () => {
    let searchForm = fb.group({
      username: [''],
      password: [''],
    })
    // let fbSpy = jest.spyOn(fb, 'group').mockReturnValue({
    //   value: { username: '', password: '' }
    // })
    //ANCHOR Arrange:Chuẩn bị
    //Act
    component.ngOnInit();
    //Assert:Nhận định
    // expect(component).toBeCalledWith(fbSpy);
    expect(component).toBeTruthy();
    // vì component là object mà object luôn luôn true
  });
  it('login:success', () => {
    component.searchForm = fb.group({
      username: [''],
      password: [''],
    })
    const data = {
      username: "nguyen",
      email: "nguyen@gmail.com",
      firstName: '',
      lastName: '',
    }
    //! Arrange
    let postDataSpy = jest.spyOn(profileService, 'signin').mockReturnValue(of(data));
    // mockReturnValue laf return ra gía trị
    let setCurrentUserObsSpy = jest.spyOn(profileService, 'setCurrentUserObs');
    let navigateSpy = jest.spyOn(router, 'navigate');
    // ACT
    component.login();
    //Asert
    expect(setCurrentUserObsSpy).toBeCalledWith(data);
    expect(navigateSpy).toBeCalledWith(['home']);
  })
  it('login:error', () => {
    component.searchForm = fb.group({
      username: [''],
      password: [''],
    })
    const data = {
      username: "nguyen",
      email: "nguyen@gmail.com",
      firstName: '',
      lastName: '',
    }
    let postDataSpy = jest.spyOn(profileService, 'signin').mockReturnValue(throwError(new Error('Lỗi')));
    component.login();
    expect(postDataSpy).toBeCalled();
  })
  it('ngOnDestroy: should create', () => {
    let sub: Subscription = of(1).subscribe();
    component.subscription = sub;
    let unSubscriptionSpy = jest.spyOn(component.subscription, 'unsubscribe')
    //Act
    component.ngOnDestroy();
    //Expect
    expect(unSubscriptionSpy).toBeCalled();
  })

});

