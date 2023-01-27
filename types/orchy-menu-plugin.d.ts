import {Observable, ReplaySubject} from 'rxjs'

import {MenuItem} from './models'
export declare class OrchyMenuApi {
    private readonly REGISTER_MENU_EVENT_LABEL
    private readonly UNREGISTER_MENU_EVENT_LABEL
    private menuItems
    private _eventBus?
    menuItems$: Observable<MenuItem[]>
    constructor(eventBus: ReplaySubject<unknown>);
    get currentMenuItems(): MenuItem[];
    registerMenu(menuItem: MenuItem): void;
    unregisterMenu(menuItem: MenuItem): void;
    private registerMenuAction
    private unregisterMenuAction
}
export declare function createMenuApi(eventBus: ReplaySubject<unknown>): OrchyMenuApi;
