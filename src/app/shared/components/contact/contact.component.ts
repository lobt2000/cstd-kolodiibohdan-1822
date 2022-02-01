import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  openCommentForm = false;
  openUserComment = false;
  regExpEmail = /^[a-z0-9\-\.]{1,}@gmail\.com|net\.us|org\.ua$/i;
  regExpFname = /^[a-z]{2,}$/i;
  regExpSname = /^[a-z]{2,}$/i;
  comments: Array<string> = [];
  commentFrom: FormGroup;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private commentService: CommentService) { }

  ngOnInit(): void {
    this.getComments();
    this.buildForm();
    window.scrollTo(0, 0);

  }

  getComments(): void {
    this.commentService.getAllComm().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.comments = data;
      console.log(this.comments);
    });

  }

  buildForm() {
    this.commentFrom = this.fb.group({
      email: this.fb.control('', [Validators.pattern(this.regExpEmail), Validators.required]),
      firstName: this.fb.control('', [Validators.pattern(this.regExpFname), Validators.required]),
      secondName: this.fb.control('', [Validators.pattern(this.regExpSname), Validators.required]),
      message: this.fb.control('', [Validators.required])
    })

  }

  save(): void {
    if (this.commentFrom.valid) {
      this.commentService.create(this.commentFrom.getRawValue()).then(
        () => {
          this.commentFrom.reset();
          this.toastr.success('Thanks for your comment!', 'Success');
        }
      )
    }
    else {
      this.commentFrom.reset();
      this.toastr.error('Something go wrong', 'Denied');
    }
  }
}
