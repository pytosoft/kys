import { LoaderState } from './../../core/services/loader/loader.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  display: Boolean = false;
  private _loaderStateChnaged!: Subscription;

  constructor(private _service: LoaderService) { }

  ngOnInit(): void {
    this._loaderStateChnaged = this._service.loaderState
    .subscribe((_state: LoaderState) => {
      this.display = _state.show
    })
  }
  ngOnDestroy(){
    this._loaderStateChnaged.unsubscribe();
  }

}
