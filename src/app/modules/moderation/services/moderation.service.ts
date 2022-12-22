import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';
import { AccessModerationInput } from '../models/input/access-moderation-input';

/**
 * Класс сервиса модерации.
 */
@Injectable()
export class ModerationService {
    public accessModeration$ = new BehaviorSubject<any>(null);
    public projectsModeration$ = new BehaviorSubject<any>(null);

    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция првоеряет доступ пользователя к модерации.
     * @returns - Признак доступа к модерации.
     */
    public async checkAvailableUserRoleModerationAsync(accessModerationInput: AccessModerationInput) {
        return await this.http.post(API_URL.apiUrl + "/moderation/check", accessModerationInput).pipe(
            tap(data => this.accessModeration$.next(data))
        );
    };

    /**
     * Функция получает список проектов для модерации.
     * @returns - Список проектов.
     */
     public async getProjectsModerationAsync() {
        return await this.http.get(API_URL.apiUrl + "/moderation/projects").pipe(
            tap(data => this.projectsModeration$.next(data))
        );
    };
}