import { Component, TemplateRef } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    users$: Observable<User[]>;
    users!: User[];
    form: FormGroup;
    isValidEmail: boolean = true;

    constructor(private userService: UserService, private modalService: NgbModal, private fb: FormBuilder) {
        this.users$ = userService.getUsers();
        this.users$.subscribe((users) => {
            this.users = users;
        });
        this.form = fb.group({
            firstName: fb.control('', Validators.required),
            lastName: fb.control('', Validators.required),
            age: fb.control('', Validators.required),
            email: fb.control('', [Validators.email, Validators.required]),
        });
    }

    onAddUser(modal: TemplateRef<any>) {
        this.modalService.open(modal, {
            centered: true,
            size: 'lg',
            backdrop: true,
            keyboard: true,
        });
    }

    onSave(modal: any) {
        const { firstName, lastName, age, email } = this.form.value;
        if (this.isUniqueEmail(email)) {
            this.isValidEmail = false;
            return;
        }
        this.userService.addUser({
            firstName,
            lastName,
            age,
            email,
        });
        this.form.reset();
        modal.close('Close');
    }

    onDelete(user: User) {
        const index = this.users.indexOf(user);
        this.userService.deleteUser(index);
    }

    isUniqueEmail(email: string) {
        return !this.users.some((user) => user.email === email);
    }
}
