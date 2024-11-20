import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExchange, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Select2Data, Select2Module, Select2Option } from 'ng-select2-component';
import CurrenciesJosn from '../../../utils/seeders/currencies.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Toastr } from '../../shared/modules/toastr/toastr.component';
import { CurrencyService } from '../../services/currency/currency.service';
import { CachedData, IFCurrencyPaload } from '../../services/currency/service.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCache } from '../../ngrx/actions/common.actions';
import { calculateConversion } from '../../../utils/helpers/functions';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FontAwesomeModule, Select2Module, NgIf, NgClass],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})

export class CurrencyConverterComponent {
  dataForm:FormGroup;
  faRightLeft = faRightLeft;
  currencyList = CurrenciesJosn;
  currencyOpitonsData: Select2Data = [];
  initialVaue:string = '';
  initialCurrencySymbol:string = '';
  targetCurrencySymbol:string = '';
  isLoading:boolean = false;
  errorMessage:string = '';
  responseResult:{
    amount:number,
    sourceCurrency:string,
    targetCurrency:string,
    exchangeRate:number,
    convertedAmount:number,
  } | null = null

  cached$: Observable<CachedData>;
  cache:CachedData = [];
  constructor(
    private fb: FormBuilder,
    private toastr: Toastr,
    private _service: CurrencyService,
    private store: Store<{cached: CachedData}>,
  ){

    this.cached$ = this.store.select('cached');
    this.cached$.subscribe((state) => {
      this.cache = state;
    });

    this.currencyOpitonsData = Object.entries(this.currencyList).map(([_, currency]) => { 
      return {
        value:currency.code,
        label:`${currency.name} | ${currency.symbol}`,
        data:currency
      } 
    });
    
    this.initialVaue = this.currencyOpitonsData[0].data.code;
    this.initialCurrencySymbol = this.currencyOpitonsData[0].data.symbol;

    // initialize form
    this.dataForm = this.fb.group({
      amount:['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      sourceCurrency:['', [Validators.required]],
      targetCurrency:['', [Validators.required]],
    })
  }
  
  onSubmit() {     
    if( this.dataForm.invalid )
      return this.dataForm.markAllAsTouched();
    
    if( this.dataForm.valid ){
      this.loader();
      
      const {amount, sourceCurrency, targetCurrency} = this.dataForm.value;
      
      const payload:IFCurrencyPaload = {
        amount,
        sourceCurrency,
        targetCurrency,
      }
      

      const cachedResult = this.cache.filter( item => {
        return item.key === `${sourceCurrency}/${targetCurrency}`
      });

      // return false;
      if( cachedResult.length ){        
        const [{response, lastUpdated}] = cachedResult;
        
        const DateTimeIns = new Date();
        const currentTimeStamp = DateTimeIns.getTime();

        console.log({currentTimeStamp})

        const differenceInMs = currentTimeStamp - lastUpdated;

        // Convert to seconds, minutes, and hours
        const differenceInSeconds = Math.floor(differenceInMs / 1000);

        console.log(`Difference in seconds: ${differenceInSeconds}s`);

        // if last udated is less than 5 mins old
        if( differenceInSeconds < 300 ){ 
          this.responseResult = {
            amount:payload.amount,
            sourceCurrency:payload.sourceCurrency,
            targetCurrency:payload.targetCurrency,
            exchangeRate:response.conversion_rate,
            convertedAmount: calculateConversion(payload.amount, response.conversion_rate),
          }
  
          this.loader(false);
          return false;
        }

      } 
      
        // calling serivce
        this._service.convert(payload).subscribe({
          next:(response)=>{
            console.log('RESPONSE ===> ', response);
            this.responseResult = {
              amount:payload.amount,
              sourceCurrency:payload.sourceCurrency,
              targetCurrency:payload.targetCurrency,
              exchangeRate:response.conversion_rate,
              convertedAmount: calculateConversion(payload.amount, response.conversion_rate),
            }
            
            // adding cached for re-user to avoid anohter api call.
            const _T = new Date();
            const lastUpdated = _T.getTime();
            const cachedData = {key:`${sourceCurrency}/${targetCurrency}`, response:response, lastUpdated:lastUpdated};
            this.store.dispatch(addToCache(cachedData))
  
          },
          error:(error)=>{
            console.error(error)
            this.loader(false, error);
          },
          complete:() =>{
            console.log(" === execution completed ===");
            this.loader(false);
          },
        });
            
    }
  }

  handleSourceCurrencyChange(event:any, type:string='source'){
    console.log(event)
    const {value, options:[{data:{symbol}}]} = event;
    if( type === 'source' ){
      this.initialCurrencySymbol = symbol;
      this.initialVaue = value;
    } else {
      this.targetCurrencySymbol = symbol;
    }
  }

  handleSwap(){
    const {amount, sourceCurrency, targetCurrency} = this.dataForm.value;
    console.log({amount, sourceCurrency, targetCurrency})

    if( sourceCurrency && targetCurrency ){
      this.initialCurrencySymbol = this.targetCurrencySymbol;
      this.dataForm.controls['sourceCurrency'].setValue(targetCurrency);
      this.dataForm.controls['targetCurrency'].setValue(sourceCurrency);
      
      if(amount){
        this.onSubmit()
      }
    }
  }

  loader(status:boolean=true, errormessage:string=''){
    this.isLoading = status
    this.errorMessage = errormessage

    if(status){
      this.responseResult=null;
    }
    if(errormessage !== ''){
      this.toastr.Error(errormessage);
    }
  }

}
