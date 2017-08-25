import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from 'ts-md5/dist/md5';

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
export class AppComponent implements OnInit {
  speak: Speak = {
    text: '',
    voice: 'Satu',
    volume: 1.0,
    rate: 0.1,
    pitch: 1
  };

  voice: SpeechSynthesisVoice;
  test = '';
  disabled = true;
  texts = [];
  savedTexts = [];
  closeResult: string;
  submitted = false;
  isGreenLeft = false;

  constructor(private modalService: NgbModal) {
    this.loadVoices();
    console.log(Md5.hashStr('blah blah blah'));
  }

  loadVoices() {
    // Fetch the available voices.
    const voices = speechSynthesis.getVoices();
    const lang = 'fi-FI';
    // Loop through each of the voices.
    this.voice = voices.find(i => i.lang === lang);
    console.log(this.voice);
  }

  addText(text: string) {
    this.loadVoices();
    this.test = text.trim();
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
    if (text.length > 0) {
      msg.text = text.trim();
      window.speechSynthesis.speak(msg);
    }
    this.speak.text = text.trim();
    this.refreshSavedTexts();
  }

  onSelect(text: string) {
    this.loadVoices();
    this.test = text.trim();
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
    if (text.length > 0) {
      msg.text = text.trim();
      window.speechSynthesis.speak(msg);
    }
    this.refreshSavedTexts();
  }

  onEdit(text: string, i: number) {
    console.log(text);
    console.log(i);
    this.isGreenLeft = true;
    this.speak.text = text.trim();
    this.refreshSavedTexts();
  }

  speakToMe(i: number = -99) {
    this.isGreenLeft = false;
    this.loadVoices();
    this.test = this.speak.text.trim();
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
      msg.text = this.speak.text.trim();
      window.speechSynthesis.speak(msg);
      if (i > -99) {
        this.texts[i] = this.speak.text.trim();
      } else if (this.texts.length > 5) {
        this.texts.unshift(this.speak.text.trim());
        this.texts.pop();
      } else {
        this.texts.unshift(this.speak.text.trim());
      }
    } else {
      msg.text = 'Kirjoita teksti, niin voin lausua sen';
      window.speechSynthesis.speak(msg);
    }

    this.refreshSavedTexts();
    console.log(this.texts);
  }

  onKey(event: any) {
    if (event.keyCode === 13) {
      this.speakToMe();
    }
  }

  clear() {
    this.speak.text = '';
  }

  onSubmit() {
    this.submitted = true;
  }

  saveToLocalStorage(text: string, i: number) {
    text = text.trim().toLowerCase();
    console.log(text + ' ' + i);
    const hash = Md5.hashStr(text).toString();
    localStorage.setItem(hash, text);
    console.log(text + ' ' + i + ' ' + hash);
    console.log(localStorage);
    this.refreshSavedTexts();
  }

  refreshSavedTexts() {
    this.savedTexts = [];
    for (let i = 0; i < localStorage.length; i++ ) {
      this.savedTexts[i] = localStorage.getItem(localStorage.key(i));
    }
  }

  removeFromLocalStorage(text: string, i: number) {
    text = text.trim().toLowerCase();
    const hash = Md5.hashStr(text).toString();
    localStorage.removeItem(hash);
    console.log(this.savedTexts);
    this.refreshSavedTexts();
    console.log('Remove LS: ' + text + ' ' + i + ' ' + hash);
    console.log(localStorage);
    console.log(this.savedTexts);
  }

  clearLocalStorage() {
    localStorage.clear();
    this.refreshSavedTexts();
  }
  ngOnInit() {
    this.refreshSavedTexts();
  }
}
