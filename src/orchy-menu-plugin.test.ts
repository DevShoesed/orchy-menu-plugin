import './orchy-menu-plugin'

import {ReplaySubject} from 'rxjs'
import {describe, expect, test} from 'vitest'

import {MenuItem} from './models'
import {createMenuApi} from './orchy-menu-plugin'


describe('orchy-menu-plugin', () => {

    describe('register menu', () => {

        const createPlugin = () => {
            const eventBus = new ReplaySubject()
            const menuPluginApi = createMenuApi(eventBus)

            return menuPluginApi
        }
        test('register menu', () => new Promise(resolve => {
            const menu:MenuItem = {
                label: 'Test Link',
                url: '/test-link',
                microfrontend: 'test-mfe',
                name: 'testLink'
            }

            const plugin = createPlugin()
            plugin.registerMenu(menu)
            plugin.menuItems$.subscribe((menuItems) => {
                expect(menuItems.length).toBe(1)
                resolve(true)
            })
        }))

        test('unregister menu', () => new Promise(resolve => {
            const menu:MenuItem = {
                label: 'Test Link',
                url: '/test-link',
                microfrontend: 'test-mfe',
                name: 'testLink'
            }

            const menu2:MenuItem = {
                label: 'Test Link 2',
                url: '/test-link-2',
                microfrontend: 'test-mfe',
                name: 'testLink2'
            }

            const plugin = createPlugin()
            plugin.registerMenu(menu)
            plugin.registerMenu(menu2)

            plugin.unregisterMenu(menu)
            
            plugin.menuItems$.subscribe((menuItems) => {
                expect(menuItems.length).toBe(1)
                expect(menuItems[0].name).toBe('testLink2')
                resolve(true)
            })
        }))
    })
})