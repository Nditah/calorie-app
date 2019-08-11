import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ChartOptions, ChartType, ChartDataSets, ChartColor } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  private gradientFill: CanvasGradient;

  @ViewChild('slides') slides: any;

  public lineChartData: Array<ChartDataSets[]> = [
    [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Weight'}],
    [{data: [28, 48, 40, 19, 86, 27, 90], label: 'Calorie'}],
    [{data: [18, 48, 77, 9, 100, 27, 40], label: 'Exercise'}],
  ];

  public lineChartLabels: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        top: 0,
        left: 0,
      },
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false,
          zeroLineWidth: 0,
        },
      }],
      yAxes: [{
        display: false,
        offset: true,
        gridLines: {
          display: true,
          zeroLineWidth: 0,
        },
      }]
    }
  };

  public lineChartColors: Array<any> = [];

  public lineChartLegend: boolean = false;

  public lineChartType: string = 'line';

  public barChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        top: 0,
        left: 0,
      },
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        display: false,
        offset: true,
        gridLines: {
          display: true,
        },
      }]
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Actual',
      backgroundColor: '#2BAE66AA',
      borderColor: '#2AE07CAA',
      hoverBackgroundColor: '#2BAE66FF',
      hoverBorderColor: '#2AE07CFF',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Required',
      backgroundColor: '#2AE07CAA',
      borderColor: '#2BAE66AA',
      hoverBackgroundColor: '#2AE07CFF',
      hoverBorderColor: '#2BAE66FF',
    }
  ];

  private slidesOpts = {
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
  
        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate: function() {
        const swiper = this;
        const {
          $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }
  
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }
  
           if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }
  
           const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });
  
         if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            const multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }
  
        const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
      },
      setTransition: function(duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    }
  };

  constructor(private menu: MenuController,
    private authService: AuthService) {
    this.menu.enable(true);
  }

  ngOnInit() {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    this.gradientFill = ctx.createLinearGradient(0, 0, 0, 180);
    this.gradientFill.addColorStop(0, '#fff8');
    this.gradientFill.addColorStop(1, '#fff1');
    this.lineChartColors.push([
      { // grey
        backgroundColor: this.gradientFill,
        borderColor: '#fffa',
        pointBackgroundColor: '#FFF',
        pointBorderColor: '#2AE07CFF',
        pointHoverBackgroundColor: '#2AE07CFF',
        pointHoverBorderColor: '#FFF'
      }
    ], [
      { // grey
        backgroundColor: this.gradientFill,
        borderColor: '#fffa',
        pointBackgroundColor: '#FFF',
        pointBorderColor: '#fffb00',
        pointHoverBackgroundColor: '#fffb00',
        pointHoverBorderColor: '#FFF'
      }
    ], [
      { // grey
        backgroundColor: this.gradientFill,
        borderColor: '#fffa',
        pointBackgroundColor: '#FFF',
        pointBorderColor: '#35e2f1',
        pointHoverBackgroundColor: '#35e2f1',
        pointHoverBorderColor: '#FFF'
      }
    ]);

    this.slides.startAutoplay();
    setTimeout(() => this.slides.stopAutoplay(), 12000);
  }

  ionViewWillEnter() {
    this.authService.getUser().then(user => {
        this.user = user;
      }
    );
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
