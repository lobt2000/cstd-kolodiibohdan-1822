import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kindergarten',
  templateUrl: './kindergarten.component.html',
  styleUrls: ['./kindergarten.component.scss']
})
export class KindergartenComponent implements OnInit {
  isLoading: boolean = false;
  kindergarten: FormGroup;
  chooseTitleColor: boolean = false;
  chooseTitleButtonColor: boolean = false;
  chooseTitleButtonTextColor: boolean = false;
  items = ['white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold']
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.kindergarten = this.fb.group({
      backgroundImg: 'https://firebasestorage.googleapis.com/v0/b/kindergarten-daed8.appspot.com/o/image%2FbacgroundImg.jpg?alt=media&token=b106542f-b902-4200-a394-e8255aba22ab',
      titleColor: '',
      title: '',
      titleButtonColor: '3dsfds',
      titleButtonTextColor: ''
    })
  }


  onClickedOutsideItem(e: Event, item: string) {
    e.stopPropagation();
    console.log(e.target['className'].includes('choose-color'));

    if (item == 'titleColor' && this.chooseTitleColor) {
      this.chooseTitleColor = false;
    }
    else if (item == 'titleButtonTextColor' && this.chooseTitleButtonTextColor) {
      this.chooseTitleButtonTextColor = false;
    }
    else if (item == 'titleButtonColor' && this.chooseTitleButtonColor && !e.target['className'].includes('choose-color')) {
      this.chooseTitleButtonColor = false;
    }
  }

  changeColor(item, where) {
    if (where == 'titleColor') this.kindergarten.get('titleColor').setValue(item)
    if (where == 'titleButtonTextColor') this.kindergarten.get('titleButtonTextColor').setValue(item)
    if (where == 'titleButtonColor') this.kindergarten.get('titleButtonColor').setValue(item)
  }


}
