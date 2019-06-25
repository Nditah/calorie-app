import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  showSkip = true;
  slideOpts = {
    effect: 'flip',
    speed: 1000
  };
  dir: String = 'ltr';

  slideList: Array<any> = [
    {
      title: 'What is <strong>Afro<span class="text-secondary">Calorie</span></strong>?',
      description: 'Afro Calorie: Diet & nutrition tracking app for African dishes and exercises',
      image: 'assets/img/burger01.png',
    },
    {
      title: 'How to use <strong>Afro<span class="text-secondary">Calorie</span> well</strong>?',
      description: 'Fill in the form to create a profile and set your diet objectives',
      image: 'assets/img/pizza01.png',
    },
    {
      title: '<strong>Then what else!</strong>',
      description: 'Daily log your diet intake and excercises selecting from the list or add custom entries',
      image: 'assets/img/pasta01.png',
    },
    {
      title: '<strong>Your delicious dish is coming!</strong>',
      description: 'As you enter records, our system will suggest feedbacks for your unique nutritional needs',
      image: 'assets/img/pasta01.png',
    }
  ];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public router: Router
  ) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onSlideNext() {
    this.slides.slideNext(1000, false);
  }

	onSlidePrev() {
    this.slides.slidePrev(300);
  }

  // onLastSlide() {
  // 	this.slides.slideTo(3, 300)
  // }

  openHomeLocation() {
    this.navCtrl.navigateRoot('/home-location');
    // this.router.navigateByUrl('/tabs/(home:home)');
  }

  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

}