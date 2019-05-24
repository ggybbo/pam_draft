import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/services/auth/_services';
import { Router } from '@angular/router';

declare var Kakao: any;
const url = '//developers.kakao.com/sdk/js/kakao.min.js';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  kakaoParams: any = '';
  loggedin: boolean;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    // private _formBuilder: FormBuilder,
    // private authenticationService: AuthenticationService,
    private el: ElementRef,
    private router: Router,
    private _authenticationService: AuthenticationService
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };

    this.loggedin = false;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // this.loginForm = this._formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });

    this.loadKakaoApi()
      .then(() => {
        // console.log('login start');
        if (sessionStorage.getItem('currentUser')) {
          // console.log('session_storage');
        }
      })
      .catch(err => console.error(err));
  }

  loadKakaoApi() {
    return new Promise((resolve, reject) => {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//developers.kakao.com/sdk/js/kakao.min.js';
      this.el.nativeElement.appendChild(s);
      s.onload = function() {
        Kakao.init('6a34b057c55410133990109463ca3484');
      };
      resolve(true);
    });
  }

  kakaoLogin(): void {
    this.kakaoLogin$()
      .then(data => {
        this.loggedin = true;
        this._authenticationService.login();
      })
      .catch(err => alert('api errors'));
  }

  kakaoLogin$(): Promise<any> {
    return new Promise((resolve, reject) => {
      Kakao.Auth.login({
        success: function(authObj) {
          let response = JSON.stringify(authObj);
          sessionStorage.setItem('currentUser', response);
          resolve(true);
        },
        fail: function(err) {
          alert(JSON.stringify(err));
          reject();
        }
      });
    });
  }

  addplusFriend(): void {
    this.addkakaoplusFriend$()
      .then(data => {
        alert('플러스 친구에 등록해주셔서 감사합니다');
      })
      .catch(err => alert('api errors'));
  }

  addkakaoplusFriend$(): Promise<any> {
    return new Promise((resolve, reject) => {
      // _Sxbxfuxl
      Kakao.PlusFriend.addFriend({
        plusFriendId: '_Sxbxfuxl' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
      });
      resolve(true);
    });
  }

  gotoAcademy(): void {
    this.router.navigate(['/apps/academy/courses']);
  }

  fbLogin(): void {
    alert('facebook login 서비스는 현재 준비중입니다');
  }
}
