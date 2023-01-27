# orchy-menu-plugin

This plugin allows comunicate register and unRegister of menu items from microfrontends using the `orchy's eventBus`.

## Plugin configuration

The plugin expose a function to create an API object:

- `createMenuApi`: unique parameter as `eventBus`: the `orchy's eventBus` instance.

The avaible API are:

- `registerMenu`: send event for add new menu item
- `unregisterMenu`: send event for remove menu item

### Menu Item

The structure of menu item is:

```json

    {
        "label": "string",
        "url": "string",
        "name": "string",
        "microfronted": "string"
    }

```

### Exampe of usage

Config shell app for recevice events:

```typescript

   ... 
   ...

    const menuApi : createMenuApi(eventBus)

    menuApi.menuItems$.subscribe({
        next: (menuItems) => {
            // menuItems is array menu item
        }
    })
```

Config microfrontend for send events: 

```typescript

    ...
    ...

    const menuApi : createMenuApi(eventBus)

    menuApi.registerMenu(
        {label: 'Click Here', url: '#', name: 'test-link', microfrontet: 'mfe-1'}
    )

    menuApi.unregisterMenu(
        {name: 'test-link', microfrontet: 'mfe-1'}
    )

```