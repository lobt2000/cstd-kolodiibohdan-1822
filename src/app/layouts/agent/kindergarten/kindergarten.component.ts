import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';

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
  isGroupCheck: boolean;
  isType: boolean;
  windowSize: number;
  isOpen: boolean;
  addAdvantages: boolean = false;
  addAddresses: boolean = false;
  addkinderForm: boolean = false;
  chooseGroupName: number = null;
  chooseGroupAgeRange: number = null;
  chooseAdvantagesTitle: number = null;
  chooseAdvantagesText: number = null;
  chooseAddressesText: number = null;
  chooseKinderFormTitle: number = null;
  chooseKinderFormText: number = null;
  chooseKinderFormTitleBackground: number = null;
  chooseKinderFormTextBackground: number = null;
  items = ['white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold']
  constructor(private fb: FormBuilder, private kindergartenServise: KindergartenListService, private storage: AngularFireStorage, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
    this.kindergartenServise.menuPosition.subscribe(
      res => {
        this.isOpen = res;
      }
    )

    this.getKindergarten();
    this.kindergarten.valueChanges.subscribe(res => {
      localStorage.setItem('kindergarten', JSON.stringify(res));
    })
  }

  getKindergarten() {
    const user = JSON.parse(localStorage.getItem('mainuser'))
    if (user.kinderId) this.kindergartenServise.getOneById(user.kinderId).pipe(take(1)).subscribe(res => {
      this.updateForm(res)
    })
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }


  buildForm() {
    this.kindergarten = this.fb.group({
      backgroundImg: '',
      titleColor: '',
      title: '',
      titleButtonColor: '3dsfds',
      titleButtonTextColor: '',
      descriptionText: '',
      // descriptionImg: 'https://firebasestorage.googleapis.com/v0/b/kindergarten-daed8.appspot.com/o/image%2FbacgroundImg.jpg?alt=media&token=b106542f-b902-4200-a394-e8255aba22ab',
      descriptionImg: '',
      kindergartenGroup: this.fb.array([]),
      kinderAdvantages: this.fb.array([]),
      kinderAddresses: this.fb.array([]),
      addressBackground: '',
      kinderForm: this.fb.array([])
    })
    if (localStorage.getItem('kindergarten')) {
      const storage = JSON.parse(localStorage.getItem('kindergarten'));
      this.updateForm(storage)
    }
  }

  updateForm(storage) {
    delete storage.id
    this.kindergarten = this.fb.group({
      ...storage,
      kindergartenGroup: this.fb.array(
        storage?.kindergartenGroup?.map(res => {
          return this.fb.group({
            ageRange: this.fb.control(res?.ageRange),
            groupImg: this.fb.control(res?.groupImg),
            name: this.fb.control(res?.name),
            groupNameColor: this.fb.control(res?.groupNameColor),
            groupAgeRangeColor: this.fb.control(res?.groupAgeRangeColor),
          })
        })
      ),
      kinderAdvantages: this.fb.array(
        storage?.kinderAdvantages?.map(res => {
          return this.fb.group({
            numImg: this.fb.control(res?.numImg),
            text: this.fb.control(res?.text),
            title: this.fb.control(res?.title),
            advantagesTitleColor: this.fb.control(res?.advantagesTitleColor),
            advantagesTextColor: this.fb.control(res?.advantagesTextColor),
          })
        })
      ),
      kinderAddresses: this.fb.array(
        storage?.kinderAddresses?.map(res => {
          return this.fb.group({
            addressName: this.fb.control(res?.addressName),
            addressPosImg: this.fb.control(res?.addressPosImg),
            addressesTextColor: this.fb.control(res?.addressesTextColor),
          })
        })),
      kinderForm: this.fb.array(
        storage?.kinderForm?.map(res => {
          return this.fb.group({
            formTitleAdditional: this.fb.control(res?.formTitleAdditional),
            formTitlePrice: this.fb.control(res?.formTitlePrice),
            formTitleTime: this.fb.control(res?.formTitleTime),
            formTitleType: this.fb.control(res?.formTitleType),
            kinderFormTitleColor: this.fb.control(res?.kinderFormTitleColor),
            kinderFormTextColor: this.fb.control(res?.kinderFormTextColor),
            kinderFormTitleBackgroundColor: this.fb.control(res?.kinderFormTitleBackgroundColor),
            kinderFormTextBackgroundColor: this.fb.control(res?.kinderFormTextBackgroundColor),
            formDescription: this.fb.array(res?.formDescription.map(item => {
              return this.fb.group({
                descText: this.fb.control(item?.descText),
                numImg: this.fb.control(item?.numImg)
              })
            }))
          })
        })
      )
    });

    if (storage?.kinderAdvantages?.length) this.addAdvantages = true;
    if (storage?.kinderAddresses?.length) this.addAddresses = true;
    if (storage?.kinderForm?.length) this.addkinderForm = true;
  }


  onClickedOutsideItem(e: Event, item: string, i?) {
    e.stopPropagation();
    if (item == 'titleColor' && this.chooseTitleColor) {
      this.chooseTitleColor = false;
    }
    else if (item == 'titleButtonTextColor' && this.chooseTitleButtonTextColor) {
      this.chooseTitleButtonTextColor = false;
    }
    else if (item == 'titleButtonColor' && this.chooseTitleButtonColor && !e.target['className'].includes('choose-color')) {
      this.chooseTitleButtonColor = false;
    }
    else if (item == 'groupNameColor' && this.chooseGroupName == i) {
      this.chooseGroupName = null;
    }
    else if (item == 'groupAgeRangeColor' && this.chooseGroupAgeRange == i) {
      this.chooseGroupAgeRange = null;
    }
    else if (item == 'advantagesTitleColor' && this.chooseAdvantagesTitle == i) {
      this.chooseAdvantagesTitle = null;
    }
    else if (item == 'advantagesTextColor' && this.chooseAdvantagesText == i) {
      this.chooseAdvantagesText = null;
    }
    else if (item == 'addressesTextColor' && this.chooseAddressesText == i) {
      this.chooseAddressesText = null;
    }
    else if (item == 'typeOfReg' && this.isType) {
      this.isType = false;
    }
    else if (item == 'groupType' && this.isGroupCheck) {
      this.isGroupCheck = false;
    }
    else if (item == 'kinderFormTitleColor' && this.chooseKinderFormTitle == i) {
      this.chooseKinderFormTitle = null;
    }
    else if (item == 'kinderFormTextColor' && this.chooseKinderFormText == i) {
      this.chooseKinderFormText = null;
    }
    else if (item == 'kinderFormTitleBackgroundColor' && this.chooseKinderFormTitleBackground == i && !e.target['className'].includes('choose-color')) {
      this.chooseKinderFormTitleBackground = null;
    }
    else if (item == 'kinderFormTextBackgroundColor' && this.chooseKinderFormTextBackground == i && !e.target['className'].includes('choose-color')) {
      this.chooseKinderFormTextBackground = null;
    }
  }

  changeColor(item, where, i?) {
    if (where == 'titleColor') this.kindergarten.get('titleColor').setValue(item)
    if (where == 'titleButtonTextColor') this.kindergarten.get('titleButtonTextColor').setValue(item)
    if (where == 'titleButtonColor') this.kindergarten.get('titleButtonColor').setValue(item)
    if (where == 'groupNameColor') this.kindergarten.get('kindergartenGroup')['controls'][i].get('groupNameColor').setValue(item)
    if (where == 'groupAgeRangeColor') this.kindergarten.get('kindergartenGroup')['controls'][i].get('groupAgeRangeColor').setValue(item)
    if (where == 'advantagesTitleColor') this.kindergarten.get('kinderAdvantages')['controls'][i].get('advantagesTitleColor').setValue(item)
    if (where == 'advantagesTextColor') this.kindergarten.get('kinderAdvantages')['controls'][i].get('advantagesTextColor').setValue(item)
    if (where == 'addressesTextColor') this.kindergarten.get('kinderAddresses')['controls'][i].get('addressesTextColor').setValue(item)
    if (where == 'kinderFormTitleColor') this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTitleColor').setValue(item)
    if (where == 'kinderFormTextColor') this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTextColor').setValue(item)
    if (where == 'kinderFormTitleBackgroundColor') this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTitleBackgroundColor').setValue(item)
    if (where == 'kinderFormTextBackgroundColor') this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTextBackgroundColor').setValue(item)
  }

  get getGroup() {
    return this.kindergarten.get('kindergartenGroup') as FormArray
  }

  get getAdvantages() {
    return this.kindergarten.get('kinderAdvantages') as FormArray
  }

  get getAddresses() {
    return this.kindergarten.get('kinderAddresses') as FormArray
  }
  get getKinderForm() {
    return this.kindergarten.get('kinderForm') as FormArray
  }

  uploadImage(event, where, i?, j?): void {
    const file = event.target.files[0];
    const filePath = `image/${file.name}`;
    const upload = this.storage.upload(filePath, file);

    upload.then(image => {
      this.storage.ref(`image/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        if (typeof i != 'undefined' && typeof j == 'undefined') this.kindergarten.get(`${where}`)['controls'][i].get('groupImg').setValue(url);
        if (typeof i != 'undefined' && typeof j != 'undefined') this.kindergarten.get(`${where}`)['controls'][i].get('formDescription')['controls'][j].get('numImg').setValue(url);
        else this.kindergarten.get(`${where}`).setValue(url);
      });
      console.log('Photo added!');
      this.toastr.success('Photo added!', 'Successed');

    });
    upload.catch(
      () => {
        this.toastr.error('Something go wrong', 'Denied');

      }
    )
  }

  addNewGroup() {
    this.getGroup.push(this.fb.group({
      ageRange: this.fb.control(''),
      groupImg: this.fb.control(''),
      name: this.fb.control(''),
      groupNameColor: this.fb.control(''),
      groupAgeRangeColor: this.fb.control(''),

    }))
  }
  addNewAdvantages() {
    this.getAdvantages.push(this.fb.group({
      numImg: this.fb.control(''),
      text: this.fb.control(''),
      title: this.fb.control(''),
      advantagesTitleColor: this.fb.control(''),
      advantagesTextColor: this.fb.control('')

    }))
  }
  addNewAddresses() {
    this.getAddresses.push(this.fb.group({
      addressName: this.fb.control(''),
      addressPosImg: this.fb.control(''),
      addressesTextColor: this.fb.control(''),
    }))
  }
  addKinderForm() {
    this.getKinderForm.push(this.fb.group({
      formTitleAdditional: this.fb.control(''),
      formTitlePrice: this.fb.control(''),
      formTitleTime: this.fb.control(''),
      formTitleType: this.fb.control(''),
      kinderFormTitleColor: this.fb.control(''),
      kinderFormTextColor: this.fb.control(''),
      kinderFormTitleBackgroundColor: this.fb.control(''),
      kinderFormTextBackgroundColor: this.fb.control(''),
      formDescription: this.fb.array([
        this.fb.group({
          descText: this.fb.control(''),
          numImg: this.fb.control('')
        })
      ])
    }))
  }

  addKinderFormDescription(elem) {
    elem.push(this.fb.group({
      descText: this.fb.control(''),
      numImg: this.fb.control('')
    }))
  }


  addSection(item) {
    if (item == 'advantages') this.addAdvantages = true
    if (item == 'addresses') this.addAddresses = true
    if (item == 'kinderForm') this.addkinderForm = true
  }

  saveEdition() {
    let user = JSON.parse(localStorage.getItem('mainuser'));
    this.kindergartenServise.updateKinder(user.kinderId, this.kindergarten.getRawValue())
    this.kindergartenServise.updKinderList.subscribe(res => {
      user.kinderId = res;
      this.authService.update(user.id, user).then(item => {
        localStorage.setItem('mainuser', JSON.stringify(user))
      })
    })
  }
  deleteGroupControl(where, i?, j?) {
    if (where == 'kindergartenGroup') {
      this.getGroup.removeAt(i)
    }
    if (where == 'kinderAdvantages') {
      this.getAdvantages.removeAt(i)
    }
    if (where == 'kinderAddresses') {
      this.getAddresses.removeAt(i)
    }
    if (where == 'kinderForm') {
      if (typeof i != 'undefined' && typeof j == 'undefined') {
        this.getKinderForm.removeAt(i)
      }
      if (typeof i != 'undefined' && typeof j != 'undefined') {
        const formDescription = this.getKinderForm.controls[i].get('formDescription') as FormArray
        formDescription.removeAt(j)
      }
    }
  }

  declineEdition() {
    localStorage.removeItem('kindergarten')
    this.kindergarten.reset()
    this.getKindergarten()
  }


}
