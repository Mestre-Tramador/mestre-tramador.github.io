//#region License
/**
 * HIGH is a single page application that govern Mestre-Tramador's virtual repositories and data.
 * Copyright (C) 2023  Mestre-Tramador
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
//#endregion

import { clientsClaim, type RouteMatchCallback } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

/**
 * Global scope redeclaration for Service Workers.
 */
declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

/**
 * Match Routes that are not for the `index.html` file.
 *
 * @param request The Route request.
 * @param url The URL of the Route.
 * @returns Only returns `true` if the route is not
 * for the `index.html` file.
 */
const indexRouteMatch: RouteMatchCallback = ({ request, url }) =>
    !(
        request.mode !== 'navigate' ||
        url.pathname.startsWith('/_') ||
        url.pathname.match(/[^/?]+\\.[^/]+$/)
    );

/**
 * Match Routes that are for media files.
 *
 * @param url The URL of the Route.
 * @returns Only returns `true` if the route is for media files.
 */
const filesRouteMatch: RouteMatchCallback = ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.png') || url.pathname.endsWith('.ttf'));

/**
 * Cache object to hold media files (assets).
 */
const assetsCache = new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })]
});

registerRoute(indexRouteMatch, createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`));

registerRoute(filesRouteMatch, assetsCache);

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
