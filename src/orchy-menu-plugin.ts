import {BehaviorSubject, Observable, ReplaySubject, shareReplay} from 'rxjs'

import {MenuEvent,MenuItem} from './models'

export class OrchyMenuApi {
    private readonly  REGISTER_MENU_EVENT_LABEL = 'registerMenu'
    private readonly  UNREGISTER_MENU_EVENT_LABEL = 'unregisterMenu'
    
    private menuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([])
    private _eventBus?:ReplaySubject<unknown>
    

    menuItems$ :Observable<MenuItem[]> = this.menuItems.asObservable().pipe(shareReplay(1))

    constructor(eventBus:ReplaySubject<unknown>){
        this._eventBus = eventBus
        
        this._eventBus.subscribe((event) => {
            const ev = event as MenuEvent
            if(ev.label == this.REGISTER_MENU_EVENT_LABEL ) {
                this.registerMenuAction(ev.payload)
            }
            if(ev.label == this.UNREGISTER_MENU_EVENT_LABEL ) {
                this.unregisterMenuAction(ev.payload)
            }
        })
    }

    get currentMenuItems(): MenuItem[] {
        return this.menuItems.getValue()
    }

    
    registerMenu(menuItem:MenuItem) {
        this._eventBus?.next({
            label: this.REGISTER_MENU_EVENT_LABEL,
            payload: {...menuItem}
        })
    }
    
    unregisterMenu(menuItem:MenuItem) {
        this._eventBus?.next({
            label: this.UNREGISTER_MENU_EVENT_LABEL,
            payload: menuItem
        })
    }

    private registerMenuAction(menuItem:MenuItem) {
        this.menuItems.next([...this.currentMenuItems, menuItem])

    }
    private unregisterMenuAction(menuItem:MenuItem) {
        this.menuItems.next(
            this.currentMenuItems.filter( m => m.microfrontend !== menuItem.microfrontend || m.name != menuItem.name)
        )
    }
    
}

export function createMenuApi(eventBus:ReplaySubject<unknown>) {
    return new OrchyMenuApi(eventBus)
}

