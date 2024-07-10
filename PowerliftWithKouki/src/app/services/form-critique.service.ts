import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class FormCritiqueService {

  feedback = this.socket.fromEvent<string>('form_critique');

  constructor(private socket: Socket) {}

  sendVideoFrame(frame: string) {
    this.socket.emit('video_frame', { image: frame });
  }
}
