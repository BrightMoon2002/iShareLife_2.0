import {Posting} from './posting';
import {StatusComment} from './StatusComment';
import {Account} from './account';

export class PostingComment {
    private id?: any;
    private content?: string;
    private dateOfComment: string;
    private posting: Posting;
    private statusComment: StatusComment;
    private owner: Account;


    constructor(content?: string, dateOfComment?: string, posting?: Posting, statusComment?: StatusComment, owner?: Account) {
        this.content = content;
        this.dateOfComment = Date.now().toString();
        this.posting = posting;
        this.statusComment = statusComment;
        this.owner = owner;
    }
    get _id(): any {
        return this.id;
    }

    set _id(value: any) {
        this.id = value;
    }

    get _content(): string {
        return this.content;
    }

    set _content(value: string) {
        this.content = value;
    }

    get _posting(): Posting {
        return this.posting;
    }

    set _posting(value: Posting) {
        this.posting = value;
    }

    get _statusComment(): StatusComment {
        return this.statusComment;
    }

    set _statusComment(value: StatusComment) {
        this.statusComment = value;
    }

    get _owner(): Account {
        return this.owner;
    }

    set _owner(value: Account) {
        this.owner = value;
    }


    get _dateOfComment(): string {
        return this.dateOfComment;
    }

    set _dateOfComment(value: string) {
        this.dateOfComment = value;
    }
}
