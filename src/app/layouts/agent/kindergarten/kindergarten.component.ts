import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { GroupDetailsComponent } from 'src/app/shared/components/group-details/group-details.component';
import { PhoneModalComponent } from 'src/app/shared/components/phone-modal/phone-modal.component';
import { kinderChangeState } from 'src/app/shared/module/kindergarten.mudule';

@Component({
  selector: 'app-kindergarten',
  templateUrl: './kindergarten.component.html',
  styleUrls: ['./kindergarten.component.scss']
})
export class KindergartenComponent implements OnInit {
  isLoading: boolean = false;
  kindergarten: FormGroup;
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  addAdvantages: boolean = false;
  addAddresses: boolean = false;
  addkinderForm: boolean = false;
  kinderStyleState = {
    chooseTitleColor: false,
    chooseTitleButtonColor: false,
    chooseTitleButtonTextColor: false,
    chooseGroupName: null,
    chooseGroupAgeRange: null,
    chooseAdvantagesTitle: null,
    chooseAdvantagesText: null,
    chooseAddressesText: null,
    chooseKinderFormTitle: null,
    chooseKinderFormText: null,
    chooseKinderFormTitleBackground: null,
    chooseKinderFormTextBackground: null,
    chooseKinderType: false,
    isGroupCheck: false,
    isType: false
  }
  items = ['white', 'blue', 'black', 'brown', 'pink', 'purple', 'red', 'green', 'gold', 'aqua', 'coral', 'crimson', 'forestgreen', 'greenyellow', 'yellow', 'olive', 'tomato']
  constructor(private fb: FormBuilder, private kindergartenServise: KindergartenListService, private storage: AngularFireStorage, private toastr: ToastrService, private authService: AuthService, private dialog: MatDialog) { }

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

  getKindergarten(move?) {
    const user = JSON.parse(localStorage.getItem('mainuser'))
    if (user.kinderId) this.kindergartenServise.getOneById(user.kinderId).pipe(take(1)).subscribe(res => {
      if (localStorage.getItem('kindergarten') && !move) {
        const storage = JSON.parse(localStorage.getItem('kindergarten'));
        this.updateForm(storage)
      } else {
        this.updateForm(res)

      }
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
      descriptionImg: '',
      kindergartenGroup: this.fb.array([]),
      kinderAdvantages: this.fb.array([]),
      kinderAddresses: this.fb.array([]),
      addressBackground: '',
      kinderForm: this.fb.array([]),
      logo: '',
      "logo-description": '',
      "logo-img": '',
      phoneNumber: '',
      kidergartenType: ''
    })
    // if (localStorage.getItem('kindergarten')) {
    //   const storage = JSON.parse(localStorage.getItem('kindergarten'));
    //   this.updateForm(storage)
    // }

  }

  updateForm(storage) {
    delete storage.id;
    this.kindergarten.reset();
    this.kindergarten.patchValue({
      ...storage,
    })
    this.getGroup.reset();
    storage?.kindergartenGroup?.forEach(res => {
      this.getGroup.push(this.fb.group({
        ageRange: this.fb.control(res?.ageRange),
        groupImg: this.fb.control(res?.groupImg),
        name: this.fb.control(res?.name),
        groupNameColor: this.fb.control(res?.groupNameColor),
        groupAgeRangeColor: this.fb.control(res?.groupAgeRangeColor),
        groupDetails: res.groupDetails ? this.fb.array(res.groupDetails.map(item => {
          return this.fb.group(item);
        })) : this.fb.array([])
      })
      )
    })

    this.getAdvantages.reset();
    storage?.kinderAdvantages?.forEach(res => {
      this.getAdvantages.push(this.fb.group({
        numImg: this.fb.control(res?.numImg),
        text: this.fb.control(res?.text),
        title: this.fb.control(res?.title),
        advantagesTitleColor: this.fb.control(res?.advantagesTitleColor),
        advantagesTextColor: this.fb.control(res?.advantagesTextColor),
      }))
    })
    this.getAddresses.reset();
    storage?.kinderAddresses?.forEach(res => {
      this.getAddresses.push(this.fb.group({
        addressName: this.fb.control(res?.addressName),
        addressPosImg: this.fb.control(res?.addressPosImg),
        addressesTextColor: this.fb.control(res?.addressesTextColor),
      }))
    })

    this.getKinderForm.reset();
    storage?.kinderForm?.forEach((res, i) => {
      this.getKinderForm.push(this.fb.group({
        formTitleAdditional: this.fb.control(res?.formTitleAdditional),
        formTitlePrice: this.fb.control(res?.formTitlePrice),
        formTitleTime: this.fb.control(res?.formTitleTime),
        formTitleType: this.fb.control(res?.formTitleType),
        kinderFormTitleColor: this.fb.control(res?.kinderFormTitleColor),
        kinderFormTextColor: this.fb.control(res?.kinderFormTextColor),
        kinderFormTitleBackgroundColor: this.fb.control(res?.kinderFormTitleBackgroundColor),
        kinderFormTextBackgroundColor: this.fb.control(res?.kinderFormTextBackgroundColor),
        formDescription: this.fb.array([])
      }));

      const formDescription = this.getKinderForm.controls[i]['controls'].formDescription as FormArray;
      formDescription.reset();
      res?.formDescription.forEach(item => {
        formDescription.push(this.fb.group({
          descText: this.fb.control(item?.descText),
          numImg: this.fb.control(item?.numImg)
        }))
      })

    })


    if (storage?.kinderAdvantages?.length) this.addAdvantages = true;
    if (storage?.kinderAddresses?.length) this.addAddresses = true;
    if (storage?.kinderForm?.length) this.addkinderForm = true;
  }


  onClickedOutsideItem(e: Event, item: string, i?) {
    e.stopPropagation();
    if (item == kinderChangeState.titleColor && this.kinderStyleState.chooseTitleColor) {
      this.kinderStyleState.chooseTitleColor = false;
    }
    else if (item == kinderChangeState.titleButtonTextColor && this.kinderStyleState.chooseTitleButtonTextColor) {
      this.kinderStyleState.chooseTitleButtonTextColor = false;
    }
    else if (item == kinderChangeState.titleButtonColor && this.kinderStyleState.chooseTitleButtonColor) {
      this.kinderStyleState.chooseTitleButtonColor = false;
    }
    else if (item == kinderChangeState.groupNameColor && this.kinderStyleState.chooseGroupName == i) {
      this.kinderStyleState.chooseGroupName = null;
    }
    else if (item == kinderChangeState.groupAgeRangeColor && this.kinderStyleState.chooseGroupAgeRange == i) {
      this.kinderStyleState.chooseGroupAgeRange = null;
    }
    else if (item == kinderChangeState.advantagesTitleColor && this.kinderStyleState.chooseAdvantagesTitle == i) {
      this.kinderStyleState.chooseAdvantagesTitle = null;
    }
    else if (item == kinderChangeState.advantagesTextColor && this.kinderStyleState.chooseAdvantagesText == i) {
      this.kinderStyleState.chooseAdvantagesText = null;
    }
    else if (item == kinderChangeState.addressesTextColor && this.kinderStyleState.chooseAddressesText == i) {
      this.kinderStyleState.chooseAddressesText = null;
    }
    else if (item == kinderChangeState.typeOfReg && this.kinderStyleState.isType) {
      this.kinderStyleState.isType = false;
    }
    else if (item == kinderChangeState.groupType && this.kinderStyleState.isGroupCheck) {
      this.kinderStyleState.isGroupCheck = false;
    }
    else if (item == kinderChangeState.kinderFormTitleColor && this.kinderStyleState.chooseKinderFormTitle == i) {
      this.kinderStyleState.chooseKinderFormTitle = null;
    }
    else if (item == kinderChangeState.kinderFormTextColor && this.kinderStyleState.chooseKinderFormText == i) {
      this.kinderStyleState.chooseKinderFormText = null;
    }
    else if (item == kinderChangeState.kinderFormTitleBackgroundColor && this.kinderStyleState.chooseKinderFormTitleBackground == i) {
      this.kinderStyleState.chooseKinderFormTitleBackground = null;
    }
    else if (item == kinderChangeState.kinderFormTextBackgroundColor && this.kinderStyleState.chooseKinderFormTextBackground == i) {
      this.kinderStyleState.chooseKinderFormTextBackground = null;
    }
    else if (item == kinderChangeState.chooseKinderType && this.kinderStyleState.chooseKinderType) {
      this.kinderStyleState.chooseKinderType = false;
    }
  }

  changeColor(item, where, i?) {
    if (where == kinderChangeState.titleColor) this.kindergarten.get('titleColor').setValue(item)
    if (where == kinderChangeState.titleButtonTextColor) this.kindergarten.get('titleButtonTextColor').setValue(item)
    if (where == kinderChangeState.titleButtonColor) this.kindergarten.get('titleButtonColor').setValue(item)
    if (where == kinderChangeState.groupNameColor) this.kindergarten.get('kindergartenGroup')['controls'][i].get('groupNameColor').setValue(item)
    if (where == kinderChangeState.groupAgeRangeColor) this.kindergarten.get('kindergartenGroup')['controls'][i].get('groupAgeRangeColor').setValue(item)
    if (where == kinderChangeState.advantagesTitleColor) this.kindergarten.get('kinderAdvantages')['controls'][i].get('advantagesTitleColor').setValue(item)
    if (where == kinderChangeState.advantagesTextColor) this.kindergarten.get('kinderAdvantages')['controls'][i].get('advantagesTextColor').setValue(item)
    if (where == kinderChangeState.addressesTextColor) this.kindergarten.get('kinderAddresses')['controls'][i].get('addressesTextColor').setValue(item)
    if (where == kinderChangeState.kinderFormTitleColor) this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTitleColor').setValue(item)
    if (where == kinderChangeState.kinderFormTextColor) this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTextColor').setValue(item)
    if (where == kinderChangeState.kinderFormTitleBackgroundColor) this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTitleBackgroundColor').setValue(item)
    if (where == kinderChangeState.kinderFormTextBackgroundColor) this.kindergarten.get('kinderForm')['controls'][i].get('kinderFormTextBackgroundColor').setValue(item)
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
    return this.getGroup.push(this.fb.group({
      ageRange: this.fb.control(''),
      groupImg: this.fb.control(''),
      name: this.fb.control(''),
      groupNameColor: this.fb.control(''),
      groupAgeRangeColor: this.fb.control(''),
      groupDetails: this.fb.array([])
    }))
  }

  addNewAdvantages() {
    return this.getAdvantages.push(this.fb.group({
      numImg: this.fb.control(''),
      text: this.fb.control(''),
      title: this.fb.control(''),
      advantagesTitleColor: this.fb.control(''),
      advantagesTextColor: this.fb.control('')
    }))
  }
  addNewAddresses() {
    return this.getAddresses.push(this.fb.group({
      addressName: this.fb.control(''),
      addressPosImg: this.fb.control(''),
      addressesTextColor: this.fb.control(''),
    }))
  }
  addKinderForm() {
    return this.getKinderForm.push(this.fb.group({
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

  openPhoneDialog() {
    const dialogRef = this.dialog.open(PhoneModalComponent, {
      data: this.kindergarten.get('phoneNumber').value
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kindergarten.get('phoneNumber').setValue(result);
      }
    });
  }

  openGroupDetails(group: FormGroup) {
    const dialogRef = this.dialog.open(GroupDetailsComponent, {
      data: {
        groupDetails: group.value.groupDetails
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const groupDetails = group.controls.groupDetails as FormArray
        groupDetails.clear();
        result.map(item => {
          groupDetails.push(this.fb.group(item));
        })
      }
    });
  }

  declineEdition() {
    localStorage.removeItem('kindergarten')
    this.kindergarten.reset();
    this.getGroup.clear();
    this.getAddresses.clear();
    this.getAdvantages.clear();
    this.getKinderForm.clear();
    this.getKindergarten('decline')
  }


}
