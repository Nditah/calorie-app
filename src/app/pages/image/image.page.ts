import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { finalize } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models';

const STORAGE_KEY = 'calorie_images';

@Component({
  selector: 'app-image',
  templateUrl: 'image.page.html',
  styleUrls: ['image.page.scss'],
  providers: [Camera],

})
export class ImagePage implements OnInit {

  images = [];

  constructor(private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private http: HttpClient,
    private webview: WebView,
    private toastController: ToastController,
    private storage: Storage,
    private platform: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        const arr = JSON.parse(images);
        this.images = [];
        for (const img of arr) {
          const filePath = this.file.dataDirectory + img;
          const resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                },
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                },
            },
            { text: 'Cancel', role: 'cancel' }
        ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
      };

      this.camera.getPicture(options).then(imagePath => {
        let correctPath = '';
        let currentName = '';
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath)
                  .then(filePath => {
                      correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                      currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                  });
          } else {
              currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
      });
  }

  createFileName() {
    const d = new Date();
    const n = d.getTime();
    const newFileName = n + '.jpg';
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    }, error => {
        this.presentToast('Error while storing file.');
    });
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
        const arr = JSON.parse(images);
        if (!arr) {
            const newImages = [name];
            this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
            arr.push(name);
            this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }
        const filePath = this.file.dataDirectory + name;
        const resPath = this.pathForImage(filePath);

        const newEntry = {
            name: name,
            path: resPath,
            filePath: filePath
        };

        this.images = [newEntry, ...this.images];
        this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
    this.storage.get(STORAGE_KEY).then(images => {
        const arr = JSON.parse(images);
        const filtered = arr.filter(name => name !== imgEntry.name);
        this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
        const correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
        this.file.removeFile(correctPath, imgEntry.name).then(res => {
            this.presentToast('File removed.');
        });
    });
  }

// Inspired by https://golb.hplar.ch/2017/02/Uploading-pictures-from-Ionic-2-to-Spring-Boot.html

  startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file));
        })
        .catch(err => {
            this.presentToast('Error while reading file.');
        });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type,
        });
        formData.append('file', imgBlob, file.name);
        this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
        message: 'Uploading image...',
    });
    await loading.present();
    this.http.post('http://0.0.0.0:5000/api/images', formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
            })
        )
        .subscribe((res: ApiResponse) => {
            if (res.success) {
                this.presentToast('File upload complete.');
            } else {
                this.presentToast('File upload failed. ' + res.message);
            }
        });
  }

}
