import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})

export class Toastr{
    constructor(private toastr: ToastrService) {}

    Success(message:string='', title:string='Success'){
        if(message ){
            this.toastr.success(message, title);
        }
        return
    }

    Error(message:string='', title:string='Failed!'){
        if(message ){
            this.toastr.error(message, title);
        }
        return
    }

    Warning(message:string='', title:string='Warning!'){
        if(message ){
            this.toastr.warning(message, title);
        }
        return
    }

    Info(message:string='', title:string='Info!'){
        if(message ){
            this.toastr.info(message, title);
        }
        return
    }

    Default(message:string='', title:string=''){
        if(message ){
            this.toastr.show(message, title);
        }
        return
    }

} 