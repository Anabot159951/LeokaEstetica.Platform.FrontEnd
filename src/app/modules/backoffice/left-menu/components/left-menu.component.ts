import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BackOfficeService } from "../../services/backoffice.service";

@Component({
    selector: "left-menu",
    templateUrl: "./left-menu.component.html",
    styleUrls: ["./left-menu.component.scss"]
})

/**
 * Класс календаря пользователя.
 */
export class LeftMenuComponent implements OnInit {
    public readonly profileItems$ = this._backOfficeService.profileItems$;
    public readonly selectMenu$ = this._backOfficeService.selectMenu$;

    sysName: string = "";
    isFindSysName: boolean = false;
    aProfileMenuLine: any[] = [];
    aViewSysNames: string[] = [
        "ViewWorksheet"
    ];
    aEditSysNames: string[] = [
        "EditWorksheet"
    ];
    aProjectsSysName: string[] = [
        "MyProjectsList"
    ];
    aCreateProjectsSysName: string[] = [
        "CreateProject"
    ];

    constructor(private readonly _backOfficeService: BackOfficeService,
        private readonly _router: Router) {
    }

    public async ngOnInit() {
        await this.getProfileInfoAsync();        
    }

    /**
     * Функция получает пункты меню профиля пользователя.
     * @returns Список меню.
     */
    private async getProfileInfoAsync() {
        (await this._backOfficeService.getProfileItemsAsync())
        .subscribe(_ => {
            console.log("Меню профиля: ", this.profileItems$.value);
        });
    };

     /**
     * Функция распределяет по роутам. 
     * @param event - Событие.
     */
    public async onSelectMenu(event: any) {
        console.log("event", event);
        let text = event.target.textContent;

        (await this._backOfficeService.selectProfileMenuAsync(text))
        .subscribe(_ => {
            console.log("Выбрали меню: ", this.selectMenu$.value.sysName);
            this.sysName = this.selectMenu$.value.sysName;

            // Роут на просмотр анкеты.
            if (this.aViewSysNames.includes(this.sysName)) {
                this._router.navigate(["/profile/aboutme"], {
                    queryParams: {
                        mode: "view"
                    }
                });
            }
            
            // Роут на изменение анкеты.
            if (this.aEditSysNames.includes(this.sysName)) {
                this._router.navigate(["/profile/aboutme"], {
                    queryParams: {
                        mode: "edit"
                    }
                });
            }

            // Роут на страницу мои проекты.
            if (this.aProjectsSysName.includes(this.sysName)) {
                this._router.navigate(["/profile/projects/my"]);
            }

            // Роут на страницу создания проекта.
            if (this.aCreateProjectsSysName.includes(this.sysName)) {
                this._router.navigate(["/profile/projects/create"]);
            }
        });
    };
}