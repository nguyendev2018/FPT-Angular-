import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { MustMatch } from './../../MustMatch/must-match';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of, Subscription, throwError } from 'rxjs';
import { User } from '../../services/profile.service';
import { RegisterComponent } from './register.component';
class RouterMock {
  navigate(commands: any, extra?: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let messageService: MessageService;
  let primengConfig: PrimeNGConfig;
  let profileService: ProfileService;
  let fb: FormBuilder;
  let router: Router;
  // let mustch: MustMatch;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
      ]
    })

      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fb = TestBed.inject(FormBuilder);
    profileService = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
    // mss = TestBed.inject(MessageService);
    // must = TestBed.inject(MustMatch);
  });
  it('ngOnInit: should create', () => {
    //ANCHOR Arrange:Chuẩn bị
    let ob = {
      value: { username: '', password: '', email: '', confirmPassword: '' }
    }
    let groupSpy = jest.spyOn(fb, 'group').mockReturnValue(<FormGroup>ob);

    //Act
    component.ngOnInit();
    //Assert:Nhận định
    expect(groupSpy).toBeCalled();
    expect(component.searchForm.value).toEqual(ob.value);
  })
  it('signUp:success', () => {
    const rest = {
      username: 'nguyen',
      password: '1234',
      email: 'nguyen@gmail.com'
    }
    const data = {
      username: 'nguyen',
      email: 'nguyen@gmail.com',
    }
    const mockRegister = fb.group({
      username: ['nguyen'],
      password: ['1234'],
      confirmPassword: ['1234'],
      email: ['nguyen@gmail.com']
    })

    let registerSpy = jest.spyOn(profileService, 'signup').mockReturnValue(of(data));
    let navigateSpy = jest.spyOn(router, 'navigate');
    // ACT
    component.searchForm = mockRegister
    component.signUp();
    //Asert
    expect(registerSpy).toBeCalledWith(rest);
    expect(navigateSpy).toBeCalledWith(['/login']);

  })
  it('singup:error', () => {
    let postDataSpy = jest.spyOn(profileService, 'signup').mockReturnValue(throwError(new Error('Lỗi')));
    component.signUp();
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
