import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { SubscriptionsService } from "../services/subscriptions.service";

@Component({
    selector: "subscriptions",
    templateUrl: "./subscriptions.component.html",
    styleUrls: ["./subscriptions.component.scss"]
})

/**
 * Класс компонента подписок.
 */
export class SubscriptionsComponent implements OnInit {
    constructor(private readonly _subscriptionsService: SubscriptionsService) { }

    public readonly subscriptions$ = this._subscriptionsService.subscriptions$;  

    public async ngOnInit() {
        forkJoin([
           await this.getSubscriptionsAsync()
        ]).subscribe();
    };   

     /**
     * Функция получает прафила тарифов.
     * @returns - Прафила тарифов.
     */
      private async getSubscriptionsAsync() {    
        (await this._subscriptionsService.getSubscriptionsAsync())
        .subscribe(_ => {
            console.log("Список подписок: ", this.subscriptions$.value);
        });
    };
}