import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-critique-form',
  templateUrl: './critique-form.component.html',
  styleUrls: ['./critique-form.component.css']
})
export class CritiqueFormComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  feedback: string = '';
  private stream: MediaStream | null = null;
  private speechSynthesis: SpeechSynthesis = window.speechSynthesis;

  constructor(private socket: Socket) {
    this.socket.on('form_critique', (feedback: string) => {
      this.feedback = feedback;
      // Delay speech synthesis by 5 seconds
      setTimeout(() => {
        this.speakFeedback(feedback);
      }, 5000);
    });
  }

  ngOnInit(): void {
    this.startCamera();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
        this.processVideo();
      })
      .catch(err => {
        console.error('Error accessing the camera', err);
      });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  processVideo() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;

    const captureFrame = () => {
      if (this.stream && context && this.videoElement.nativeElement.srcObject) {
        context.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg');
        const base64 = dataURL.split(',')[1];
        this.socket.emit('video_frame', { image: base64 });

        setTimeout(captureFrame, 100);
      }
    };

    captureFrame();
  }

  speakFeedback(feedback: string) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = feedback;
    this.speechSynthesis.speak(msg);
  }
}
