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
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private el: ElementRef,
    private router: Router
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
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    // if (localStorage.getItem('currentUser')) {
    //   this.router.navigate(['/']);
    // }
    this.loadKakaoApi()
      .then(() => console.log('login start'))
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
        // function loginWithKakao() {
        //   // 로그인 창을 띄웁니다.
        //   Kakao.Auth.login({
        //     success: function(authObj) {
        //       alert(JSON.stringify(authObj));
        //     },
        //     fail: function(err) {
        //       alert(JSON.stringify(err));
        //     }
        //   });
        // }
        // Kakao.Auth.createLoginButton({
        //   container: '#kakao-login-btn',
        //   success: function(authObj) {
        //     let response = JSON.stringify(authObj);
        //     localStorage.setItem('currentUser', response);
        //   },
        //   fail: function(err) {
        //     alert(JSON.stringify(err));
        //   }
        // });
      };
      resolve(true);
    });
  }

  kakaoLogin(): void {
    // this.authenticationService.login().subscribe(data => {
    //   console.log('kakao login');
    // });
    this.loadKakaoApi().then(() => {
      Kakao.Auth.login({
        success: function(authObj) {
          let response = JSON.stringify(authObj);
          localStorage.setItem('currentUser', response);
          window.location.href = '/';
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    });
  }

  fbLogin(): void {
    alert('facebook login 서비스는 현재 준비중입니다');
  }
}
