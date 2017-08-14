import { Component } from '@angular/core';
import { NgClass } from '@angular/common';


export class Speak {
  text: string;
  voice: string;
  volume: number;
  rate: number;
  pitch: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  speak: Speak = {
    text: '',
    voice: 'Satu',
    volume: 1.0,
    rate: 0.1,
    pitch: 1
  };

  voice: SpeechSynthesisVoice;
  test = '';

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() {
    this.loadVoices();
  }

  loadVoices() {
    // Fetch the available voices.
    const voices = speechSynthesis.getVoices();
    const lang = 'fi-FI';
    // Loop through each of the voices.
    this.voice = voices.find(i => i.lang === lang);
    console.log(this.voice);
  }


  speakToMe() {
    this.loadVoices();
    this.test = this.speak.text;
    if ('speechSynthesis' in window) {
      this.test = 'Selaimesi tukee puhesyntetisaattoria';
    } else {
      this.test = 'Pahoittelen ettei selaimesi tue puhesyntetisaattoria';
    }

    const msg = new SpeechSynthesisUtterance();
    msg.volume = this.speak.volume;
    msg.pitch = this.speak.pitch;
    msg.rate = this.speak.rate;
    msg.voice = this.voice;
    if (this.speak.text.length > 0) {
      msg.text = this.speak.text;
      window.speechSynthesis.speak(msg);
    } else {
      msg.text = 'Kirjoita teksti, niin voin lausua sen';
      window.speechSynthesis.speak(msg);
    }
  }

  onKey(event: any) {
    if (event.keyCode === 13) {
      this.speakToMe();
    }
  }

  clear() {
    this.speak.text = '';
  }
}
