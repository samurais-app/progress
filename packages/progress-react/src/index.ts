import React from "react";
import ReactDOM from "react-dom";
import { ProgressCore } from 'progress-core';
import { LoadingContainer, ProgressLoading } from './loading';
export class Progress extends ProgressCore {
    constructor() {
        super();
        this.init();
    }

    private assetsLoading: LoadingContainer | undefined;
    private progressLoading: ProgressLoading | undefined;
    private init = () => {
        let assetsloading = document.getElementById('assetsloading');
        let progressLoading = document.getElementById('progressloading');
        if (assetsloading) assetsloading.remove();
        if (progressLoading) progressLoading.remove();
        /** loading创建 */
        assetsloading = document.createElement('div');
        assetsloading.id = 'assetsloading';
        assetsloading.style.setProperty('width', '100vw');
        assetsloading.style.setProperty('position', 'absolute');
        assetsloading.style.setProperty('top', '0px');
        assetsloading.style.setProperty('z-index', '10000');
        assetsloading.style.setProperty('pointer-events', 'none');

        progressLoading = document.createElement('div');
        progressLoading.id = 'progressloading';
        progressLoading.style.setProperty('width', '100vw');
        progressLoading.style.setProperty('position', 'absolute');
        progressLoading.style.setProperty('top', '0px');
        progressLoading.style.setProperty('z-index', '10000');
        progressLoading.style.setProperty('pointer-events', 'none');
        this.assetsLoading = ReactDOM.render(React.createElement(LoadingContainer), assetsloading);
        this.progressLoading = ReactDOM.render(React.createElement(ProgressLoading), progressLoading);
        document.body.appendChild(assetsloading);
        document.body.appendChild(progressLoading);
        this.monitor('start', 'assets', (status) => {
            this.assetsLoading?.status(true);
        });
        this.monitor('start', 'fetch', (status) => {
            this.progressLoading?.status(true);
        });
        this.monitor('end', 'fetch', (status) => {
            this.progressLoading?.status(false);
        });
        this.monitor('end', 'assets', (status) => {
            this.assetsLoading?.status(false);
        })
    }
}